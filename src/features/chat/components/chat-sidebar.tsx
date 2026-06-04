import { type ReactElement } from "react";
import {
  PenNewSquare,
  Magnifer,
  MenuDots,
  User as UserIcon,
} from "@/shared/ui/icons";

import type { Chat, User } from "../types";
import { DRAFT_CHAT_TITLE } from "../constants";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/helpers/cn";
import logoChat from "./logo-chat.svg";

function groupChats(chats: Chat[]): { group: string; chats: Chat[] }[] {
  const groups: { group: string; chats: Chat[] }[] = [];
  for (const chat of chats) {
    const existing = groups.find((entry) => entry.group === chat.group);
    if (existing) {
      existing.chats.push(chat);
    } else {
      groups.push({ group: chat.group, chats: [chat] });
    }
  }
  return groups;
}

interface ChatSidebarProps {
  chats: Chat[];
  query: string;
  onQueryChange: (query: string) => void;
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

function ChatSidebar({
  chats,
  query,
  onQueryChange,
  activeChatId,
  onSelectChat,
  onNewChat,
  user,
  isOpen,
  onClose,
}: ChatSidebarProps): ReactElement {
  const groups = groupChats(chats);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close chat list"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-transform md:static md:translate-x-0 md:transition-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <header className="flex h-14 items-center px-4">
          <img src={logoChat} alt="FAR" className="max-w-[74px]" />
        </header>

        <div className="flex flex-col gap-1 px-2">
          <Button
            variant="ghost"
            className="h-9 justify-start gap-2 px-2"
            onClick={() => {
              onNewChat();
              onClose();
            }}
          >
            <PenNewSquare className="size-4 shrink-0" />
            New Chat
          </Button>
          <div className="relative">
            <Magnifer className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => {
                onQueryChange(event.target.value);
              }}
              placeholder="Search Chats"
              aria-label="Search chats"
              className="h-9 border-transparent bg-transparent pl-8 focus-visible:border-input"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-1 flex-col gap-4 overflow-y-auto px-2 pb-2">
          {groups.map((group) => (
            <div key={group.group} className="flex flex-col gap-1">
              <h2 className="px-2 py-2 text-xs font-medium text-muted-foreground">
                {group.group}
              </h2>
              {group.chats.map((chat) => (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => {
                    onSelectChat(chat.id);
                    onClose();
                  }}
                  className={cn(
                    "truncate rounded-lg px-2 py-2 text-left text-sm hover:bg-sidebar-accent",
                    chat.id === activeChatId && "bg-sidebar-accent",
                  )}
                >
                  {chat.title || DRAFT_CHAT_TITLE}
                </button>
              ))}
            </div>
          ))}
          {groups.length === 0 && (
            <p className="px-2 text-sm text-muted-foreground">
              No chats found.
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 border-t border-sidebar-border p-3">
          <UserIcon className="size-8 shrink-0 text-primary" />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-medium">
              {user?.name ?? "Loading…"}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {user?.email ?? ""}
            </span>
          </div>
          <Button variant="ghost" size="icon" aria-label="Account menu">
            <MenuDots className="size-4" />
          </Button>
        </div>
      </aside>
    </>
  );
}

export default ChatSidebar;
