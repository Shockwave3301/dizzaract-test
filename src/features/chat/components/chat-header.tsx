import type { ReactElement } from "react";

import ThinkingIndicator from "./thinking-indicator";

function ChatHeader(): ReactElement {
  return (
    <header className="flex h-10 items-center justify-center gap-3 bg-chat-surface py-2.5">
      <span className="text-sm text-muted-foreground">1 000 t/s</span>
      <ThinkingIndicator />
      <span className="text-sm text-green-500">20% faster</span>
    </header>
  );
}

export default ChatHeader;
