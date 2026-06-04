import { useEffect, useRef, useState, type ReactElement } from "react";
import { Paperclip } from "@/shared/ui/icons";

import ChatHeader from "./chat-header";
import MessageInput from "./message-input";
import ThinkingLoading from "./thinking-loading";
import { models } from "../constants";
import type { Message, Model } from "../types";

interface ConversationProps {
  messages: Message[];
  isThinking: boolean;
  onSend: (text: string, attachments: string[]) => void;
  onStop: () => void;
}

function Conversation({
  messages,
  isThinking,
  onSend,
  onStop,
}: ConversationProps): ReactElement {
  const [activeModel, setActiveModel] = useState<Model>(models[0]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  return (
    <div
      className="flex min-w-0 flex-1 flex-col bg-chat-surface"
      data-model={activeModel.id}
    >
      {isThinking && <ChatHeader />}

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex h-full w-full max-w-3xl flex-col gap-6 px-4 py-8">
          {messages.length === 0 && !isThinking && (
            <p className="my-auto text-center text-sm text-muted-foreground">
              Ask anything to start a new conversation.
            </p>
          )}

          {messages.map((message) =>
            message.role === "user" ? (
              <div key={message.id} className="flex flex-col items-end gap-1">
                {message.attachments.length > 0 && (
                  <ul className="flex flex-wrap justify-end gap-2">
                    {message.attachments.map((name, index) => (
                      <li
                        key={`${name}-${String(index)}`}
                        className="flex items-center gap-1 rounded-lg bg-secondary px-2 py-1 text-xs"
                      >
                        <Paperclip className="size-3.5" />
                        <span className="max-w-40 truncate">{name}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {message.content && (
                  <div className="max-w-[80%] rounded-2xl bg-secondary px-4 py-2.5 text-sm whitespace-pre-wrap">
                    {message.content}
                  </div>
                )}
              </div>
            ) : (
              <div key={message.id} className="flex flex-col items-start">
                <div className="max-w-[80%] text-sm whitespace-pre-wrap text-foreground">
                  {message.content}
                </div>
              </div>
            ),
          )}

          {isThinking && <ThinkingLoading />}

          <div ref={bottomRef} />
        </div>
      </div>

      <div className="bg-linear-to-t from-chat-surface to-transparent">
        <div className="mx-auto w-full max-w-3xl px-4 pt-2 pb-3">
          <MessageInput
            onSend={onSend}
            onStop={onStop}
            isSending={isThinking}
            activeModel={activeModel}
            onModelSelect={setActiveModel}
          />
          <p className="mt-2 text-center text-xs text-muted-foreground">
            FARCHAT can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
