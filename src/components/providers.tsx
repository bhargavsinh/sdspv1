import { useEffect, type ReactNode } from "react";
import { toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { bindToast, useSdsp } from "@/lib/storage/store";
import { tickReminders } from "@/lib/notifications/reminders";
import { LotusMark } from "@/components/brand/mark";

function applyTheme(theme: "dark" | "light" | "system") {
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = theme === "dark" || (theme === "system" && systemDark);
  root.classList.toggle("dark", dark);
}

export function AppProviders({ children }: { children: ReactNode }) {
  const ready = useSdsp((s) => s.ready);
  const hydrate = useSdsp((s) => s.hydrate);
  const settings = useSdsp((s) => s.settings);
  const setOnline = useSdsp((s) => s.setOnline);
  const nitya = useSdsp((s) => s.nitya);
  const events = useSdsp((s) => s.events);
  const notificationsEnabled = settings.notificationsEnabled;

  useEffect(() => {
    bindToast((message, opts) => toast(message, opts));
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!ready) return;
    applyTheme(settings.theme);
    document.documentElement.dataset.size = settings.fontSize;
    document.documentElement.classList.toggle("reduce-motion", settings.reducedMotion);
  }, [ready, settings.theme, settings.fontSize, settings.reducedMotion]);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, [setOnline]);

  useEffect(() => {
    if (!ready || !notificationsEnabled) return;
    const id = window.setInterval(() => tickReminders({ enabled: true, nitya, events }), 20_000);
    tickReminders({ enabled: true, nitya, events });
    return () => window.clearInterval(id);
  }, [ready, notificationsEnabled, nitya, events]);

  useEffect(() => {
    if (!import.meta.env.PROD) return;
    if (!("serviceWorker" in navigator)) return;
    void navigator.serviceWorker.register("/sw.js").catch(() => undefined);
  }, []);

  if (!ready) {
    return (
      <div className="temple-wash flex min-h-dvh flex-col items-center justify-center gap-4 bg-background text-foreground">
        <LotusMark className="size-16" />
        <p className="font-display text-3xl">SDSP</p>
        <p className="gu text-sm text-muted-foreground">શ્રી દેવદમન સેવા પ્લાનર</p>
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={200}>
      {children}
      <Toaster position="top-center" />
    </TooltipProvider>
  );
}
