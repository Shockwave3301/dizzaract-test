import { request } from "@/shared/api/api";

import type { ApiKey } from "./types";

export async function getApiKeys(): Promise<ApiKey[]> {
  const res = await request("/api/api-keys", "Failed to load API keys");
  return (await res.json()) as ApiKey[];
}

export async function disableApiKey(id: string): Promise<ApiKey> {
  const res = await request(
    `/api/api-keys/${id}/disable`,
    "Failed to disable API key",
    { method: "POST" },
  );
  return (await res.json()) as ApiKey;
}

export async function deleteApiKey(id: string): Promise<void> {
  await request(`/api/api-keys/${id}`, "Failed to delete API key", {
    method: "DELETE",
  });
}
