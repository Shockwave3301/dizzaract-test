import { request } from "@/shared/api/api";

import type { Chat } from "./types";

export { getUser } from "@/shared/api/user";

export async function getChats(): Promise<Chat[]> {
  const res = await request("/api/chats", "Failed to load chats");
  return (await res.json()) as Chat[];
}
