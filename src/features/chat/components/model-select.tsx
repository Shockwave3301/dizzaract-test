import { type ReactElement } from "react";
import { ArrowDown, Check } from "@/shared/ui/icons";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/button";
import { models } from "../constants";
import type { Model } from "../types";

interface ModelSelectProps {
  activeModel: Model;
  onSelect: (model: Model) => void;
  disabled: boolean;
}

function ModelSelect({
  activeModel,
  onSelect,
  disabled,
}: ModelSelectProps): ReactElement {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          disabled={disabled}
          className="h-auto gap-1.5 px-3 py-2 text-muted-foreground"
        >
          <activeModel.Icon />
          {activeModel.name}
          <ArrowDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        align="start"
        className="w-72 rounded-3xl p-0"
      >
        {models.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onSelect={() => {
              onSelect(model);
            }}
            className="cursor-pointer gap-3 rounded-none px-3 py-2 hover:bg-accent"
          >
            <model.Icon className="size-5 shrink-0" />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="font-medium text-foreground">{model.name}</span>
              <span className="text-xs text-muted-foreground">
                {model.description}
              </span>
            </div>
            {model.id === activeModel.id && (
              <Check className="size-4 shrink-0" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ModelSelect;
