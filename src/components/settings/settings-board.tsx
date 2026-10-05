import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { downloadBackup, exportBackup, parseBackup, restoreBackup } from "@/lib/backup/backup";
import { ensureNotificationPermission } from "@/lib/notifications/reminders";
import { formatBytes } from "@/lib/utils";
import { useSdsp } from "@/lib/storage/store";
import type { CalendarView, FontSize, ThemeMode } from "@/lib/sdsp/types";

type BeforeInstallPromptEvent = Event & { prompt: () => Promise<void> };

export function SettingsBoard() {
  const settings = useSdsp((s) => s.settings);
  const patch = useSdsp((s) => s.patchSettings);
  const reset = useSdsp((s) => s.resetNityaDefaults);
  const wipe = useSdsp((s) => s.wipeAll);
  const usage = useSdsp((s) => s.usage);
  const quota = useSdsp((s) => s.quota);
  const addFolder = useSdsp((s) => s.addFolder);
  const [confirm, setConfirm] = useState<"reset" | "wipe" | "restore" | null>(null);
  const [pendingBackup, setPendingBackup] = useState<ReturnType<typeof parseBackup> | null>(null);
  const [installEvt, setInstallEvt] = useState<BeforeInstallPromptEvent | null>(null);
  const [perm, setPerm] = useState<string>("default");
  const [folderName, setFolderName] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const onInstall = (e: Event) => {
      e.preventDefault();
      setInstallEvt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onInstall);
    if (typeof Notification !== "undefined") setPerm(Notification.permission);
    return () => window.removeEventListener("beforeinstallprompt", onInstall);
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <h1 className="font-display text-3xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">Private, local, and fully under your control.</p>
      </header>

      {message && <p className="rounded-xl bg-secondary px-4 py-3 text-sm">{message}</p>}

      <section className="glass space-y-4 rounded-2xl p-5">
        <h2 className="font-display text-xl">Appearance</h2>
        <div className="grid gap-1.5">
          <Label>Theme</Label>
          <Select value={settings.theme} onValueChange={(v) => void patch({ theme: v as ThemeMode })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1.5">
          <Label>Font size</Label>
          <Select value={settings.fontSize} onValueChange={(v) => void patch({ fontSize: v as FontSize })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <label className="flex items-center justify-between gap-3">
          <span className="text-sm">Reduce motion</span>
          <Switch checked={settings.reducedMotion} onCheckedChange={(v) => void patch({ reducedMotion: v })} />
        </label>
        <label className="flex items-center justify-between gap-3">
          <span className="text-sm">Compact dashboard</span>
          <Switch checked={settings.dashboardCompact} onCheckedChange={(v) => void patch({ dashboardCompact: v })} />
        </label>
      </section>

      <section className="glass space-y-4 rounded-2xl p-5">
        <h2 className="font-display text-xl">Calendar & panchang</h2>
        <div className="grid gap-1.5">
          <Label>Default calendar view</Label>
          <Select
            value={settings.calendarDefaultView}
            onValueChange={(v) => void patch({ calendarDefaultView: v as CalendarView })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(["day", "week", "month", "year", "agenda"] as const).map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="ny">Gujarati new year (MM-DD)</Label>
          <Input
            id="ny"
            value={settings.vsNewYearMd}
            onChange={(e) => void patch({ vsNewYearMd: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            Used only to estimate Vikram Samvat and month. Override any day from the dashboard.
          </p>
        </div>
      </section>

      <section className="glass space-y-4 rounded-2xl p-5">
        <h2 className="font-display text-xl">Reminders</h2>
        <label className="flex items-center justify-between gap-3">
          <span className="text-sm">Enable browser notifications</span>
          <Switch
            checked={settings.notificationsEnabled}
            onCheckedChange={async (v) => {
              if (v) {
                const p = await ensureNotificationPermission();
                setPerm(p);
                if (p !== "granted") {
                  setMessage("Notifications were not allowed. You can enable them in the browser site settings.");
                  await patch({ notificationsEnabled: false });
                  return;
                }
              }
              await patch({ notificationsEnabled: v });
            }}
          />
        </label>
        <p className="text-xs text-muted-foreground">Permission: {perm}. Reminders fire while SDSP is open.</p>
        <div className="grid gap-1.5">
          <Label htmlFor="defrem">Default reminder (minutes before)</Label>
          <Input
            id="defrem"
            type="number"
            min={1}
            value={settings.defaultReminder}
            onChange={(e) => void patch({ defaultReminder: Math.max(1, Number(e.target.value) || 15) })}
          />
        </div>
      </section>

      <section className="glass space-y-4 rounded-2xl p-5">
        <h2 className="font-display text-xl">Install</h2>
        <p className="text-sm text-muted-foreground">
          SDSP is an installable app. On Android, use the browser menu to Add to Home screen.
        </p>
        {installEvt && (
          <Button
            onClick={async () => {
              await installEvt.prompt();
              setInstallEvt(null);
            }}
          >
            Install SDSP
          </Button>
        )}
      </section>

      <section className="glass space-y-4 rounded-2xl p-5">
        <h2 className="font-display text-xl">Folders</h2>
        <div className="flex gap-2">
          <Input placeholder="New folder under SDSP" value={folderName} onChange={(e) => setFolderName(e.target.value)} />
          <Button
            variant="outline"
            onClick={() => {
              if (!folderName.trim()) return;
              void addFolder("folder_root", folderName.trim());
              setFolderName("");
            }}
          >
            Create
          </Button>
        </div>
      </section>

      <section className="glass space-y-4 rounded-2xl p-5">
        <h2 className="font-display text-xl">Backup SDSP</h2>
        <p className="text-xs text-muted-foreground">
          {quota ? `Using ${formatBytes(usage)} of ${formatBytes(quota)}.` : "Storage estimate unavailable."} Everything stays on this device.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={async () => {
              const backup = await exportBackup(true);
              downloadBackup(backup);
            }}
          >
            Backup SDSP
          </Button>
          <Button
            variant="outline"
            onClick={async () => {
              const backup = await exportBackup(false);
              downloadBackup(backup);
            }}
          >
            Export without files
          </Button>
          <label className="inline-flex h-11 cursor-pointer items-center rounded-lg border border-border px-4 text-sm">
            Restore SDSP
            <input
              type="file"
              accept="application/json"
              className="sr-only"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                try {
                  const raw = JSON.parse(await file.text()) as unknown;
                  setPendingBackup(parseBackup(raw));
                  setConfirm("restore");
                } catch (err) {
                  setMessage(err instanceof Error ? err.message : "Could not read that backup.");
                }
              }}
            />
          </label>
        </div>
      </section>

      <section className="glass space-y-4 rounded-2xl p-5">
        <h2 className="font-display text-xl">Seva structure</h2>
        <Button variant="outline" onClick={() => setConfirm("reset")}>
          Reset to default seva structure
        </Button>
        <Button variant="destructive" onClick={() => setConfirm("wipe")}>
          Clear all data
        </Button>
      </section>

      <section className="text-sm text-muted-foreground">
        <h2 className="font-display text-foreground text-xl">Privacy</h2>
        <p className="mt-2">
          No account, no analytics, no ads, no cloud. Photographs and PDFs live in this browser’s IndexedDB.
        </p>
      </section>

      <AlertDialog open={Boolean(confirm)} onOpenChange={(o) => !o && setConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirm === "reset" && "Reset nitya seva?"}
              {confirm === "wipe" && "Clear all SDSP data?"}
              {confirm === "restore" && "Restore this backup?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirm === "reset" && "The seven default nitya seva return. History logs are kept."}
              {confirm === "wipe" && "Seva, files, notes and panchang on this device will be replaced with defaults."}
              {confirm === "restore" && "Current data on this device will be replaced by the backup."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (confirm === "reset") await reset();
                if (confirm === "wipe") await wipe();
                if (confirm === "restore" && pendingBackup) {
                  try {
                    await restoreBackup(pendingBackup);
                    setMessage("Backup restored.");
                  } catch (err) {
                    setMessage(err instanceof Error ? err.message : "Restore failed.");
                  }
                }
                setPendingBackup(null);
                setConfirm(null);
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
