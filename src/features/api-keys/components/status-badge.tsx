import { type ReactElement } from "react";
import { type ApiKeyStatus } from "../types";
import { cn } from "@/shared/helpers/cn";

const statusLabels: Record<ApiKeyStatus, string> = {
  active: "Active",
  expired: "Expired",
  disabled: "Disabled",
};

function StatusBadge({ status }: { status: ApiKeyStatus }): ReactElement {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold",
        status === "active"
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground",
      )}
    >
      {statusLabels[status]}
    </span>
  );
}

export default StatusBadge;
