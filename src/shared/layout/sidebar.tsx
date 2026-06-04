import { useEffect, useState, type ReactElement } from "react";
import {
  SidebarMinimalistic,
  Key,
  Layers,
  ChartSquare,
  Card,
  Gamepad,
  Wallet,
  Settings,
  Book,
  User,
  ChatRound,
} from "@/shared/ui/icons";
import { Link } from "@tanstack/react-router";
import logo from "./logo.svg";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/helpers/cn";

const sections = [
  {
    title: "Platform",
    items: [
      { label: "Models", icon: Layers, to: "/models" },
      { label: "API keys", icon: Key, to: "/api-keys" },
      { label: "Usage", icon: ChartSquare, to: "/usage" },
      { label: "Billing", icon: Card, to: "/billing" },
      { label: "Playground", icon: Gamepad, to: "/playground" },
    ],
  },
  {
    title: "Node",
    items: [{ label: "Node rewards", icon: Wallet, to: "/node-rewards" }],
  },
  {
    title: "System",
    items: [
      { label: "Settings", icon: Settings, to: "/settings" },
      { label: "Docs", icon: Book, to: "/docs" },
    ],
  },
  {
    title: "Misc.",
    items: [{ label: "Chat", icon: ChatRound, to: "/chat", newTab: true }],
  },
] as const;

const mobileItems = [
  { label: "Models", icon: Layers, to: "/models" },
  { label: "API Keys", icon: Key, to: "/api-keys" },
  { label: "Usage", icon: ChartSquare, to: "/usage" },
  { label: "Billing", icon: Card, to: "/billing" },
  { label: "Account", icon: User, to: "/settings" },
] as const;

// Below this width the sidebar auto-folds; the user can still expand it manually.
const narrowQuery = "(max-width: 769px)";

function getIsNarrow(): boolean {
  return window.matchMedia(narrowQuery).matches;
}

function Sidebar(): ReactElement {
  const [isCollapsed, setIsCollapsed] = useState(getIsNarrow);

  // Auto-fold/unfold when the viewport crosses the narrow threshold, but only on
  // that transition — the user can toggle it back open afterward and it stays
  // that way until the breakpoint changes again.
  useEffect(() => {
    const query = window.matchMedia(narrowQuery);
    const handleChange = (event: MediaQueryListEvent): void => {
      setIsCollapsed(event.matches);
    };
    query.addEventListener("change", handleChange);
    return () => {
      query.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <aside
      className={cn(
        "w-full overflow-auto border-sidebar-border p-2",
        "border-t min-[480px]:h-svh min-[480px]:border-t-0 min-[480px]:border-r",
        "min-[480px]:shrink-0 min-[480px]:transition-[width]",
        isCollapsed ? "min-[480px]:w-13" : "min-[480px]:w-64",
      )}
    >
      <header
        className={cn(
          "hidden items-center min-[480px]:flex",
          isCollapsed
            ? "min-[480px]:justify-center"
            : "min-[480px]:justify-between",
        )}
      >
        {!isCollapsed && (
          <img src={logo} alt="Logo" className="box-content max-w-[74px] p-2" />
        )}
        <Button
          variant="ghost"
          size="icon"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => {
            setIsCollapsed((value) => !value);
          }}
        >
          {isCollapsed ? (
            <SidebarMinimalistic className="-scale-x-100" />
          ) : (
            <SidebarMinimalistic />
          )}
        </Button>
      </header>

      <nav className="flex h-full items-center justify-around gap-1 min-[480px]:hidden">
        {mobileItems.map(({ label, icon: Icon, to }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <Link
              to={to}
              aria-label={label}
              className="flex h-8 w-12 items-center justify-center rounded-[16px] hover:bg-muted active:bg-muted/70"
              activeProps={{ className: "bg-muted" }}
            >
              <Icon className="size-4 shrink-0" />
            </Link>
            <span className="max-w-12 truncate text-[10px] leading-none">
              {label}
            </span>
          </div>
        ))}
      </nav>

      <nav className="mt-4 hidden flex-col gap-4 min-[480px]:flex">
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-1">
            <h2
              className={cn(
                "px-2 text-xs font-medium text-muted-foreground",
                isCollapsed && "hidden",
              )}
            >
              {section.title}
            </h2>
            {section.items.map((item) => {
              const { label, icon: Icon, to } = item;
              const isNewTab = "newTab" in item && item.newTab;
              const newTabProps = isNewTab
                ? { target: "_blank", rel: "noreferrer" }
                : {};
              return (
                <Link
                  key={label}
                  to={to}
                  aria-label={label}
                  {...newTabProps}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2 py-2 text-left text-sm hover:bg-muted active:bg-muted/70",
                    isCollapsed ? "justify-center" : "justify-start",
                  )}
                  activeProps={{ className: "bg-muted" }}
                >
                  <Icon className="size-4 shrink-0" />
                  {!isCollapsed && label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
