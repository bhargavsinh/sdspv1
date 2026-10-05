import { combineDateTime } from "@/lib/calendar/dates";
import { todayISO } from "@/lib/utils";
import type { NityaSeva, VisheshEvent } from "@/lib/sdsp/types";

const fired = new Set<string>();

function key(kind: string, id: string, offset: number, date: string) {
  return `${kind}:${id}:${date}:${offset}`;
}

export async function ensureNotificationPermission(): Promise<NotificationPermission | "unsupported"> {
  if (typeof Notification === "undefined") return "unsupported";
  if (Notification.permission === "granted" || Notification.permission === "denied") {
    return Notification.permission;
  }
  try {
    return await Notification.requestPermission();
  } catch {
    return "denied";
  }
}

export function showNotice(title: string, body: string, url = "/") {
  try {
    if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
    const n = new Notification(title, {
      body,
      icon: "/favicon.svg",
      tag: title,
      data: { url },
    });
    n.onclick = () => {
      window.focus();
      n.close();
    };
  } catch (err) {
    console.error("notification failed", err);
  }
}

export function tickReminders(args: {
  enabled: boolean;
  nitya: NityaSeva[];
  events: VisheshEvent[];
  now?: Date;
}) {
  if (!args.enabled) return;
  if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
  const now = args.now ?? new Date();
  const date = todayISO(now);

  for (const seva of args.nitya.filter((s) => s.enabled)) {
    const start = combineDateTime(date, seva.time);
    for (const offset of seva.reminderOffsets) {
      const fireAt = start.getTime() - offset * 60_000;
      const k = key("seva", seva.id, offset, date);
      if (fired.has(k)) continue;
      if (now.getTime() >= fireAt && now.getTime() < fireAt + 60_000) {
        fired.add(k);
        showNotice(`${seva.name} · ${seva.nameEn}`, `Begins in ${offset} minutes (${seva.time}).`, `/seva/${seva.id}`);
      }
    }
  }

  for (const event of args.events) {
    if (event.date !== date) continue;
    const start = combineDateTime(event.date, event.startTime || "08:00");
    for (const offset of event.reminderOffsets) {
      const fireAt = start.getTime() - offset * 60_000;
      const k = key("event", event.id, offset, date);
      if (fired.has(k)) continue;
      if (now.getTime() >= fireAt && now.getTime() < fireAt + 60_000) {
        fired.add(k);
        showNotice(event.title, `Starts in ${offset} minutes.`, `/event/${event.id}`);
      }
    }
  }
}
