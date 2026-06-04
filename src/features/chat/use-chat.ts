import { useEffect, useRef, useState } from "react";

import { getChats, getUser } from "./api";
import { ChatSocket } from "./socket";
import { NEW_CHAT_GROUP } from "./constants";
import type { Chat, Message, User } from "./types";

function createMessage(
  role: Message["role"],
  content: string,
  attachments: string[] = [],
): Message {
  return { id: crypto.randomUUID(), role, content, attachments };
}

export interface UseChatResult {
  chats: Chat[];
  user: User | null;
  activeChatId: string | null;
  messages: Message[];
  isThinking: boolean;
  selectChat: (id: string) => void;
  startNewChat: () => void;
  sendMessage: (text: string, attachments: string[]) => void;
  stopReply: () => void;
}

// Owns the chat session: the conversation list, per-chat message history, the
// pending (waiting-for-reply) state, and the WebSocket connection that carries
// messages to and from the (mocked) server.
export function useChat(): UseChatResult {
  const [chats, setChats] = useState<Chat[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messagesByChat, setMessagesByChat] = useState<
    Record<string, Message[]>
  >({});
  const [pendingByChat, setPendingByChat] = useState<Record<string, boolean>>(
    {},
  );

  const socketRef = useRef<ChatSocket | null>(null);

  // Load the conversation list and current user when the chat view opens.
  useEffect(() => {
    let isStale = false;
    getChats()
      .then((loaded) => {
        if (!isStale) setChats(loaded);
      })
      .catch(() => {
        if (!isStale) setChats([]);
      });
    getUser()
      .then((loaded) => {
        if (!isStale) setUser(loaded);
      })
      .catch(() => {
        if (!isStale) setUser(null);
      });
    return () => {
      isStale = true;
    };
  }, []);

  // Open the chat connection for the session and route each reply back to the
  // conversation it belongs to — even if the user has since switched chats.
  useEffect(() => {
    const socket = new ChatSocket((event) => {
      setMessagesByChat((current) => ({
        ...current,
        [event.chatId]: [
          ...(current[event.chatId] ?? []),
          createMessage("assistant", event.text),
        ],
      }));
      setPendingByChat((current) => ({ ...current, [event.chatId]: false }));
    });
    socketRef.current = socket;
    return () => {
      socketRef.current = null;
      socket.close();
    };
  }, []);

  function selectChat(id: string): void {
    setActiveChatId(id);
  }

  function startNewChat(): void {
    // Don't stack blank drafts: reopen the existing one if the user hasn't
    // written in it yet.
    const draft = chats.find((chat) => chat.title === "");
    if (draft) {
      setActiveChatId(draft.id);
      return;
    }
    const chat: Chat = {
      id: crypto.randomUUID(),
      title: "",
      group: NEW_CHAT_GROUP,
    };
    setChats((current) => [chat, ...current]);
    setActiveChatId(chat.id);
  }

  function sendMessage(text: string, attachments: string[]): void {
    const trimmed = text.trim();
    if (trimmed === "" && attachments.length === 0) return;

    // Resolve the destination chat, lazily creating one if the user started
    // typing before opening a chat.
    let targetId = activeChatId;
    if (targetId === null) {
      const chat: Chat = {
        id: crypto.randomUUID(),
        title: trimmed,
        group: NEW_CHAT_GROUP,
      };
      targetId = chat.id;
      setChats((current) => [chat, ...current]);
      setActiveChatId(chat.id);
    } else {
      // The first message in a draft names the chat.
      const id = targetId;
      setChats((current) =>
        current.map((chat) =>
          chat.id === id && chat.title === ""
            ? { ...chat, title: trimmed }
            : chat,
        ),
      );
    }
    const chatId: string = targetId;

    const message = createMessage("user", trimmed, attachments);
    setMessagesByChat((current) => ({
      ...current,
      [chatId]: [...(current[chatId] ?? []), message],
    }));
    setPendingByChat((current) => ({ ...current, [chatId]: true }));

    socketRef.current?.send({ type: "user_message", chatId, text: trimmed });
  }

  function stopReply(): void {
    if (activeChatId === null) return;
    const id = activeChatId;
    setPendingByChat((current) => ({ ...current, [id]: false }));
    socketRef.current?.send({ type: "cancel", chatId: id });
  }

  const messages = activeChatId ? (messagesByChat[activeChatId] ?? []) : [];
  const isThinking = activeChatId
    ? (pendingByChat[activeChatId] ?? false)
    : false;

  return {
    chats,
    user,
    activeChatId,
    messages,
    isThinking,
    selectChat,
    startNewChat,
    sendMessage,
    stopReply,
  };
}
