import { type ReactElement } from "react";
import { createRoute, Outlet } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";
import Sidebar from "@/shared/layout/sidebar";
import Header from "@/shared/layout/header";

function AppLayout(): ReactElement {
  return (
    <div className="flex min-h-svh flex-col-reverse bg-background min-[480px]:flex-row">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex flex-1 items-start justify-center p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  id: "app-layout",
  component: AppLayout,
});
