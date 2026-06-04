import { ws } from "msw";

import { CHAT_SOCKET_URL } from "@/features/chat/constants";
import type { ChatClientEvent, ChatServerEvent } from "@/features/chat/types";

// How long the "server" deliberates before answering, to exercise the UI's loading state.
const REPLY_DELAY_MS = 5000;
const MOCK_REPLY = "Hello, this is a mocked response!";

const chat = ws.link(CHAT_SOCKET_URL);

export const chatHandlers = [
  chat.addEventListener("connection", ({ client }) => {
    // Pending replies for this connection, keyed by chat so a cancel can target
    // the right one.
    const timers = new Map<string, ReturnType<typeof setTimeout>>();

    client.addEventListener("message", (event) => {
      if (typeof event.data !== "string") return;
      const message = JSON.parse(event.data) as ChatClientEvent;

      if (message.type === "user_message") {
        const timer = setTimeout(() => {
          timers.delete(message.chatId);
          const reply: ChatServerEvent = {
            type: "assistant_message",
            chatId: message.chatId,
            text: MOCK_REPLY,
          };
          client.send(JSON.stringify(reply));
        }, REPLY_DELAY_MS);
        timers.set(message.chatId, timer);
      }

      if (message.type === "cancel") {
        const timer = timers.get(message.chatId);
        if (timer !== undefined) {
          clearTimeout(timer);
          timers.delete(message.chatId);
        }
      }
    });

    client.addEventListener("close", () => {
      for (const timer of timers.values()) clearTimeout(timer);
      timers.clear();
    });
  }),
];
