import { createRoute } from "@tanstack/react-router";
import { Route as AppLayoutRoute } from "./app-layout";
import ApiKeys from "@/features/api-keys";

export const Route = createRoute({
  getParentRoute: () => AppLayoutRoute,
  path: "/api-keys",
  component: ApiKeys,
});
