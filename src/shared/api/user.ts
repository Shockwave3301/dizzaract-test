import { request } from "./api";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  balance: string;
}

export async function getUser(): Promise<User> {
  const res = await request("/api/user", "Failed to load user");
  return (await res.json()) as User;
}
