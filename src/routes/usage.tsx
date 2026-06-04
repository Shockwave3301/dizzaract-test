import { createRoute } from "@tanstack/react-router";
import { Route as AppLayoutRoute } from "./app-layout";
import EmptyFeature from "@/shared/ui/empty-feature";

export const Route = createRoute({
  getParentRoute: () => AppLayoutRoute,
  path: "/usage",
  component: EmptyFeature,
});
