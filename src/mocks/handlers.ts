import { http, HttpResponse } from "msw";
import type { ApiKey } from "@/features/api-keys/types";
import type { Chat, User } from "@/features/chat/types";
import { chatHandlers } from "./chat-socket";

const user: User = {
  id: 1,
  name: "Shakhbulat Gazgireev",
  email: "shakhbulatgaz@gmail.com",
  role: "Admin",
  balance: "$145,20",
};

// Conversations are created by the user at runtime, so the backend starts empty.
const chats: Chat[] = [];

let apiKeys: ApiKey[] = [
  {
    id: "1",
    name: "ai_inference_key",
    keyPreview: "a1b2...x9yz",
    status: "active",
    expires: "In 29 days",
    created: "03.04.2026",
    lastUsed: "Never",
  },
  {
    id: "2",
    name: "model_training_key",
    keyPreview: "c3d4...w8vu",
    status: "active",
    expires: "In 27 days",
    created: "31.03.2026",
    lastUsed: "7 hours ago",
  },
  {
    id: "3",
    name: "vision_model_key",
    keyPreview: "e5f6...t7rs",
    status: "expired",
    expires: "—",
    created: "25.03.2026",
    lastUsed: "2 days ago",
  },
  {
    id: "4",
    name: "vision_model_key_v1",
    keyPreview: "g7h8...q6po",
    status: "expired",
    expires: "—",
    created: "05.03.2026",
    lastUsed: "13 days ago",
  },
];

// Mocked requests. MSW intercepts real requests mock the response
export const handlers = [
  http.get("/api/user", () => {
    return HttpResponse.json(user);
  }),
  http.get("/api/api-keys", () => {
    return HttpResponse.json(apiKeys);
  }),
  http.post("/api/api-keys/:id/disable", ({ params }) => {
    const apiKey = apiKeys.find((key) => key.id === params.id);
    if (!apiKey) {
      return new HttpResponse(null, { status: 404 });
    }
    apiKey.status = "disabled";
    return HttpResponse.json(apiKey);
  }),
  http.delete("/api/api-keys/:id", ({ params }) => {
    if (!apiKeys.some((key) => key.id === params.id)) {
      return new HttpResponse(null, { status: 404 });
    }
    apiKeys = apiKeys.filter((key) => key.id !== params.id);
    return new HttpResponse(null, { status: 204 });
  }),
  http.get("/api/chats", () => {
    return HttpResponse.json(chats);
  }),
  ...chatHandlers,
];
