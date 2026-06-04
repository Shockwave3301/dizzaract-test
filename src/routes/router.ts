import { createRouter } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";
import { Route as AppLayoutRoute } from "./app-layout";
import { Route as IndexRoute } from "./index";
import { Route as ChatRoute } from "./chat";
import { Route as ModelsRoute } from "./models";
import { Route as ApiKeysRoute } from "./api-keys";
import { Route as UsageRoute } from "./usage";
import { Route as BillingRoute } from "./billing";
import { Route as PlaygroundRoute } from "./playground";
import { Route as NodeRewardsRoute } from "./node-rewards";
import { Route as SettingsRoute } from "./settings";
import { Route as DocsRoute } from "./docs";

const routeTree = RootRoute.addChildren([
  IndexRoute,
  ChatRoute,
  AppLayoutRoute.addChildren([
    ModelsRoute,
    ApiKeysRoute,
    UsageRoute,
    BillingRoute,
    PlaygroundRoute,
    NodeRewardsRoute,
    SettingsRoute,
    DocsRoute,
  ]),
]);

export const router = createRouter({
  routeTree,
  basepath: import.meta.env.BASE_URL,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
