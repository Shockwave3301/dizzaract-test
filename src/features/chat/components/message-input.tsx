import { useRef, useState, type KeyboardEvent, type ReactElement } from "react";
import { Paperclip, Play, Stop, CloseSquare } from "@/shared/ui/icons";

import { Button } from "@/shared/ui/button";
import ModelSelect from "./model-select";
import type { Model } from "../types";

interface MessageInputProps {
  onSend: (text: string, attachments: string[]) => void;
  onStop: () => void;
  isSending: boolean;
  activeModel: Model;
  onModelSelect: (model: Model) => void;
}

function MessageInput({
  onSend,
  onStop,
  isSending,
  activeModel,
  onModelSelect,
}: MessageInputProps): ReactElement {
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEmpty = text.trim() === "" && attachments.length === 0;

  function handleSend(): void {
    if (isEmpty || isSending) return;
    onSend(text.trim(), attachments);
    setText("");
    setAttachments([]);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-3">
      {attachments.length > 0 && (
        <ul className="mb-2 flex flex-wrap gap-2">
          {attachments.map((name, index) => (
            <li
              key={`${name}-${String(index)}`}
              className="flex items-center gap-1 rounded-lg bg-muted py-1 pr-1 pl-2 text-xs"
            >
              <span className="max-w-40 truncate">{name}</span>
              <button
                type="button"
                aria-label={`Remove ${name}`}
                onClick={() => {
                  setAttachments((current) =>
                    current.filter((_, position) => position !== index),
                  );
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <CloseSquare className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <textarea
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder="What's on your mind?"
        rows={1}
        className="max-h-40 w-full resize-none bg-transparent px-2 pt-1 text-sm outline-none placeholder:text-muted-foreground"
      />

      <div className="mt-2 flex items-center justify-between">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(event) => {
            const files = Array.from(event.target.files ?? []);
            setAttachments((current) => [
              ...current,
              ...files.map((file) => file.name),
            ]);
            event.target.value = "";
          }}
        />
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label="Attach files"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip />
        </Button>
        <div className="flex items-center gap-2">
          <ModelSelect
            activeModel={activeModel}
            onSelect={onModelSelect}
            disabled={isSending}
          />
          <Button
            size="icon-lg"
            aria-label={isSending ? "Stop generating" : "Send message"}
            disabled={!isSending && isEmpty}
            onClick={isSending ? onStop : handleSend}
            className="rounded-xl bg-foreground text-background hover:bg-foreground/90"
          >
            {isSending ? <Stop /> : <Play />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MessageInput;
