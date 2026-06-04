import { CupStar, Bolt, Quill, Code } from "@/shared/ui/icons";

import type { Model } from "./types";

// WebSocket endpoint for the realtime chat session.
// There is no real server — MSW intercepts this URL and plays the role of the backend.
export const CHAT_SOCKET_URL = "ws://localhost/ws/chat";

// Sidebar group that newly created conversations are filed under.
export const NEW_CHAT_GROUP = "Today";

// Placeholder shown for a fresh chat until its first message names it.
export const DRAFT_CHAT_TITLE = "New Chat";

export const models: [Model, ...Model[]] = [
  {
    id: "best",
    name: "Best",
    description: "Synthesizes the best answer from multiple models",
    Icon: CupStar,
  },
  {
    id: "fastest",
    name: "Fastest",
    description: "Lowest latency, high speed",
    Icon: Bolt,
  },
  {
    id: "creative",
    name: "Creative",
    description: "High temperature, imaginative",
    Icon: Quill,
  },
  {
    id: "code",
    name: "Code",
    description: "Optimized for logic & syntax",
    Icon: Code,
  },
];
