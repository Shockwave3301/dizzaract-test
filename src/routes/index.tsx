import { type ReactElement } from "react";
import { createRoute, Navigate } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";

function IndexRedirect(): ReactElement {
  return <Navigate to="/api-keys" replace />;
}

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: IndexRedirect,
});
