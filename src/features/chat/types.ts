import { CupStar } from "@/shared/ui/icons";

export type { User } from "@/shared/api/user";

export interface Chat {
  id: string;
  title: string;
  group: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  attachments: string[];
}

// Events the client sends to the server over the chat socket.
export type ChatClientEvent =
  | { type: "user_message"; chatId: string; text: string }
  | { type: "cancel"; chatId: string };

// Events the server sends back to the client over the chat socket.
export interface ChatServerEvent {
  type: "assistant_message";
  chatId: string;
  text: string;
}

export type ModelIcon = typeof CupStar;

export interface Model {
  id: string;
  name: string;
  description: string;
  Icon: ModelIcon;
}
