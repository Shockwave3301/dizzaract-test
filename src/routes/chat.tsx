import { createRoute } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";
import Chat from "@/features/chat";

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: "/chat",
  component: Chat,
});
