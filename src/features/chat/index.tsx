import { useState, type ReactElement } from "react";
import { List } from "@/shared/ui/icons";

import { Button } from "@/shared/ui/button";
import { DRAFT_CHAT_TITLE } from "./constants";
import { useChat } from "./use-chat";
import ChatSidebar from "./components/chat-sidebar";
import Conversation from "./components/conversation";

function Chat(): ReactElement {
  const {
    chats,
    user,
    activeChatId,
    messages,
    isThinking,
    selectChat,
    startNewChat,
    sendMessage,
    stopReply,
  } = useChat();
  const [query, setQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredChats = chats.filter((chat) =>
    (chat.title || DRAFT_CHAT_TITLE)
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  return (
    <div className="relative flex h-svh bg-background text-foreground">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open chat list"
        onClick={() => {
          setIsSidebarOpen(true);
        }}
        className="absolute top-3 left-3 z-30 bg-sidebar md:hidden"
      >
        <List className="size-5" />
      </Button>
      <ChatSidebar
        chats={filteredChats}
        query={query}
        onQueryChange={setQuery}
        activeChatId={activeChatId}
        onSelectChat={selectChat}
        onNewChat={startNewChat}
        user={user}
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false);
        }}
      />
      <Conversation
        messages={messages}
        isThinking={isThinking}
        onSend={sendMessage}
        onStop={stopReply}
      />
    </div>
  );
}

export default Chat;
