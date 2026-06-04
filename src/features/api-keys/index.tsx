import { useEffect, useState, type ReactElement } from "react";
import { Plus } from "@/shared/ui/icons";

import { getApiKeys, disableApiKey, deleteApiKey } from "./api";
import type { ApiKey } from "./types";
import { columns } from "./constants";
import { Button } from "@/shared/ui/button";
import StatusBadge from "./components/status-badge";
import KeyActions from "./components/key-actions";
import ApiKeysMobile from "./components/api-keys-mobile";

function ApiKeys(): ReactElement {
  const [apiKeys, setApiKeys] = useState<ApiKey[] | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getApiKeys()
      .then(setApiKeys)
      .catch(() => {
        setIsError(true);
      });
  }, []);

  function handleDisable(id: string): void {
    disableApiKey(id)
      .then((updated) => {
        setApiKeys(
          (keys) =>
            keys?.map((key) => (key.id === updated.id ? updated : key)) ?? null,
        );
      })
      .catch(() => {
        setIsError(true);
      });
  }

  function handleDelete(id: string): void {
    deleteApiKey(id)
      .then(() => {
        setApiKeys((keys) => keys?.filter((key) => key.id !== id) ?? null);
      })
      .catch(() => {
        setIsError(true);
      });
  }

  return (
    <section className="flex w-full max-w-7xl flex-col gap-4 self-start 2xl:max-w-352">
      <div className="flex items-center gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <h1 className="text-xl font-semibold">API keys</h1>
          <p className="text-sm text-muted-foreground">
            Manage your API keys to access all models
          </p>
        </div>
        <Button className="hidden h-auto px-3 py-2 min-[480px]:inline-flex">
          <Plus />
          Create API key
        </Button>
      </div>

      <div className="hidden w-full overflow-hidden rounded-xl border border-border min-[480px]:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="border-b border-border px-2 py-3 text-left font-medium text-muted-foreground first:pl-3"
                >
                  {column}
                </th>
              ))}
              <th className="border-b border-border" />
            </tr>
          </thead>
          <tbody>
            {apiKeys?.map((apiKey) => (
              <tr
                key={apiKey.id}
                className="border-b border-border last:border-0"
              >
                <td className="px-2 py-3 pl-3 text-foreground">
                  {apiKey.name}
                </td>
                <td className="px-2 py-3 text-foreground">
                  {apiKey.keyPreview}
                </td>
                <td className="px-2 py-3">
                  <StatusBadge status={apiKey.status} />
                </td>
                <td className="px-2 py-3 text-foreground">{apiKey.expires}</td>
                <td className="px-2 py-3 text-foreground">{apiKey.created}</td>
                <td className="px-2 py-3 text-foreground">{apiKey.lastUsed}</td>
                <td className="px-2 py-3 text-right">
                  <KeyActions
                    onDisable={() => {
                      handleDisable(apiKey.id);
                    }}
                    onDelete={() => {
                      handleDelete(apiKey.id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ApiKeysMobile
        apiKeys={apiKeys}
        onDisable={handleDisable}
        onDelete={handleDelete}
      />

      {isError && (
        <p className="text-sm text-destructive">Failed to load API keys.</p>
      )}

      {!apiKeys && !isError && (
        <p className="text-sm text-muted-foreground">Loading…</p>
      )}
    </section>
  );
}

export default ApiKeys;
