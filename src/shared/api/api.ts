export async function request(
  url: string,
  description: string,
  init?: RequestInit,
): Promise<Response> {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`${description} (${String(res.status)})`);
  }
  return res;
}
