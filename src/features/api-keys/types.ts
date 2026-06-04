export type ApiKeyStatus = "active" | "expired" | "disabled";

export interface ApiKey {
  id: string;
  name: string;
  keyPreview: string;
  status: ApiKeyStatus;
  expires: string;
  created: string;
  lastUsed: string;
}
