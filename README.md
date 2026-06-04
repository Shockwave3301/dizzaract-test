# General

Two pages created: an api-keys page and a chat page. No backend — all HTTP and the chat
WebSocket are mocked with [MSW](https://mswjs.io/), so it runs fully self-contained.

## Stack

React 19 (React Compiler) · TypeScript · Vite · TanStack Router · Tailwind v4 +
shadcn/ui · MSW · ESLint + Prettier

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## MSW

The app has no real server; MSW intercepts requests in the browser and answers them
with in-memory mocks. The worker is started in [main.tsx](src/main.tsx) before React
mounts. HTTP handlers (`/api/user`, `/api/api-keys`, `/api/chats`) live in
[handlers.ts](src/mocks/handlers.ts); mock state is mutable, so e.g. disabling or
deleting an API key persists for the session. App code just calls a `fetch` wrapper
and is unaware it's mocked.

### Chat WebSocket mock

The chat uses a real WebSocket, mocked via MSW's `ws` API.

- [socket.ts](src/features/chat/socket.ts) — typed client wrapper; buffers sends
  until the socket opens.
- [chat-socket.ts](src/mocks/chat-socket.ts) — the mock "server": on a
  `user_message` it replies after a 5s delay (to show the loading state); a `cancel`
  clears that pending reply.
- [use-chat.ts](src/features/chat/use-chat.ts) — owns the session and routes each
  reply back to the right conversation.

Client and mock share one `CHAT_SOCKET_URL` constant so the endpoint can't drift.

## Chat "thinking" animations

Both are pure-CSS effects in [index.css](src/styles/index.css), shown while a reply
is pending.

- **[thinking-loading.tsx](src/features/chat/components/thinking-loading.tsx)** — a
  `Thinking...` line. A wide gradient is clipped to the text (`background-clip: text`)
  and its `background-position` is animated to sweep a bright band left → right.
- **[thinking-indicator.tsx](src/features/chat/components/thinking-indicator.tsx)** —
  a 6×3 LED matrix in the chat header. JS slides a 6-cell window over three
  brightness-level "tracks" and steps the frame on an interval; each cell renders a
  `data-level`, and CSS maps levels to colors with a short crossfade so a pulse
  glides across. Colors derive from the active model's `--primary`, so the matrix
  recolors per selected model.
