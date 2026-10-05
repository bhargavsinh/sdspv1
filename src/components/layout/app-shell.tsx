import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  CalendarDays,
  FolderOpen,
  Home,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";
import { Wordmark } from "@/components/brand/mark";
import { CommandSearch } from "@/components/search/command-search";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSdsp } from "@/lib/storage/store";

const NAV = [
  { to: "/", label: "Home", gu: "ઘર", icon: Home },
  { to: "/calendar", label: "Calendar", gu: "કૅલેન્ડર", icon: CalendarDays },
  { to: "/seva", label: "Seva", gu: "સેવા", icon: Sparkles },
  { to: "/files", label: "Files", gu: "ફાઇલ", icon: FolderOpen },
  { to: "/settings", label: "Settings", gu: "સેટિંગ્સ", icon: Settings },
];

function isActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const online = useSdsp((s) => s.online);

  return (
    <div className="temple-wash min-h-dvh bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-background/80 p-5 backdrop-blur-md lg:flex">
        <Wordmark />
        <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Primary">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                <span>{item.label}</span>
                <span className="gu ml-auto text-xs opacity-80">{item.gu}</span>
              </Link>
            );
          })}
        </nav>
        <div className="space-y-2 text-xs text-muted-foreground">
          <Link to="/pranalika" className="block rounded-lg px-3 py-2 hover:bg-accent hover:text-foreground">
            Seva Pranalika
          </Link>
          <Link to="/planner" className="block rounded-lg px-3 py-2 hover:bg-accent hover:text-foreground">
            Planner
          </Link>
          <Link to="/history" className="block rounded-lg px-3 py-2 hover:bg-accent hover:text-foreground">
            History
          </Link>
          <Link to="/notes" className="block rounded-lg px-3 py-2 hover:bg-accent hover:text-foreground">
            Notes
          </Link>
        </div>
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md">
          <div className="lg:hidden">
            <Wordmark compact />
          </div>
          <div className="ml-auto flex items-center gap-2">
            {!online && (
              <span className="rounded-full bg-skip/15 px-2.5 py-1 text-xs text-skip">Offline</span>
            )}
            <CommandSearch />
            <Button variant="ghost" size="icon" asChild aria-label="Search">
              <Link to="/search">
                <Search className="size-5" />
              </Link>
            </Button>
          </div>
        </header>
        <main id="main" className="mx-auto w-full max-w-6xl px-4 py-5 pb-28 lg:pb-10">
          {children}
        </main>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/90 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
        aria-label="Mobile"
      >
        <ul className="grid grid-cols-5">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.to);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px]",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
