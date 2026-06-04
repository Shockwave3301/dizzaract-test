import { useEffect, useState, type ReactElement } from "react";

import { getUser, type User } from "@/shared/api/user";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Header(): ReactElement {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let isStale = false;
    getUser()
      .then((loaded) => {
        if (!isStale) setUser(loaded);
      })
      .catch(() => {
        if (!isStale) setUser(null);
      });
    return () => {
      isStale = true;
    };
  }, []);

  return (
    <header className="hidden h-16 w-full items-center justify-end gap-3 border-b border-sidebar-border px-6 min-[480px]:flex">
      <div className="flex items-center rounded-lg bg-secondary px-3 py-2 text-sm font-medium">
        {user?.balance ?? "—"}
      </div>
      <div className="flex size-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
        {user ? getInitials(user.name) : ""}
      </div>
    </header>
  );
}

export default Header;
