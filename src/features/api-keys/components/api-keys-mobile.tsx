import { type ReactElement } from "react";
import { Plus } from "@/shared/ui/icons";

import { type ApiKey } from "../types";
import { Button } from "@/shared/ui/button";
import StatusBadge from "./status-badge";
import KeyActions from "./key-actions";

interface ApiKeysMobileProps {
  apiKeys: ApiKey[] | null;
  onDisable: (id: string) => void;
  onDelete: (id: string) => void;
}

// Collapsing lastUsed and status to one line in mobile layout
function getMetaLine(apiKey: ApiKey): string {
  const usage =
    apiKey.lastUsed === "Never"
      ? "never used"
      : `used ${apiKey.lastUsed.toLowerCase()}`;
  if (apiKey.status === "active") {
    return `Expires ${apiKey.expires}, ${usage}`;
  }
  return `${usage.charAt(0).toUpperCase()}${usage.slice(1)}`;
}

function ApiKeysMobile({
  apiKeys,
  onDisable,
  onDelete,
}: ApiKeysMobileProps): ReactElement {
  return (
    <>
      <ul className="flex w-full flex-col gap-3 min-[480px]:hidden">
        {apiKeys?.map((apiKey) => (
          <li
            key={apiKey.id}
            className="flex items-center gap-2 rounded-xl border border-border bg-card py-3 pr-3 pl-4"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-center gap-1 text-sm font-medium">
                <span className="truncate text-foreground">{apiKey.name}</span>
                <span className="min-w-0 flex-1 truncate text-muted-foreground">
                  {apiKey.keyPreview}
                </span>
              </div>
              <p className="truncate text-xs text-muted-foreground">
                {getMetaLine(apiKey)}
              </p>
            </div>
            {apiKey.status !== "active" && (
              <StatusBadge status={apiKey.status} />
            )}
            <KeyActions
              onDisable={() => {
                onDisable(apiKey.id);
              }}
              onDelete={() => {
                onDelete(apiKey.id);
              }}
            />
          </li>
        ))}
      </ul>

      <Button
        size="icon-lg"
        aria-label="Create API key"
        className="fixed right-4 bottom-20 z-10 size-11 rounded-xl min-[480px]:hidden"
      >
        <Plus />
      </Button>
    </>
  );
}

export default ApiKeysMobile;
