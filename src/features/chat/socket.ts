import { CHAT_SOCKET_URL } from "./constants";
import type { ChatClientEvent, ChatServerEvent } from "./types";

// Typed wrapper around the chat WebSocket. Outgoing events are buffered until
// the connection is open, so callers can send a message without first waiting
// on the handshake.
export class ChatSocket {
  private readonly socket: WebSocket;
  private readonly pending: ChatClientEvent[] = [];

  constructor(onEvent: (event: ChatServerEvent) => void) {
    this.socket = new WebSocket(CHAT_SOCKET_URL);
    this.socket.addEventListener("open", () => {
      this.flush();
    });
    this.socket.addEventListener("message", (event: MessageEvent<string>) => {
      onEvent(JSON.parse(event.data) as ChatServerEvent);
    });
  }

  send(event: ChatClientEvent): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(event));
    } else {
      this.pending.push(event);
    }
  }

  close(): void {
    this.socket.close();
  }

  private flush(): void {
    for (const event of this.pending) {
      this.socket.send(JSON.stringify(event));
    }
    this.pending.length = 0;
  }
}
