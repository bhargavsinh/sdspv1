import { parseISODate, todayISO } from "@/lib/utils";

export function addDays(iso: string, days: number): string {
  const d = parseISODate(iso);
  d.setDate(d.getDate() + days);
  return todayISO(d);
}

export function startOfWeek(iso: string, weekStartsOn = 1): string {
  const d = parseISODate(iso);
  const day = d.getDay();
  const diff = (day - weekStartsOn + 7) % 7;
  d.setDate(d.getDate() - diff);
  return todayISO(d);
}

export function startOfMonth(iso: string): string {
  const d = parseISODate(iso);
  return todayISO(new Date(d.getFullYear(), d.getMonth(), 1));
}

export function endOfMonth(iso: string): string {
  const d = parseISODate(iso);
  return todayISO(new Date(d.getFullYear(), d.getMonth() + 1, 0));
}

export function monthGrid(iso: string, weekStartsOn = 1): string[] {
  const start = startOfWeek(startOfMonth(iso), weekStartsOn);
  const cells: string[] = [];
  for (let i = 0; i < 42; i++) cells.push(addDays(start, i));
  return cells;
}

export function weekDays(iso: string, weekStartsOn = 1): string[] {
  const start = startOfWeek(iso, weekStartsOn);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export function yearMonths(year: number): string[] {
  return Array.from({ length: 12 }, (_, i) => todayISO(new Date(year, i, 1)));
}

export function sameMonth(a: string, b: string) {
  return a.slice(0, 7) === b.slice(0, 7);
}

export function formatLong(iso: string): string {
  return parseISODate(iso).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatMedium(iso: string): string {
  return parseISODate(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatMonthYear(iso: string): string {
  return parseISODate(iso).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

export function minutesFromHHMM(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function hhmmFromMinutes(min: number): string {
  const h = Math.floor(min / 60) % 24;
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function formatTime(hhmm: string): string {
  const [hStr, mStr] = hhmm.split(":");
  const h = Number(hStr);
  const m = Number(mStr);
  if (!Number.isFinite(h)) return hhmm;
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h % 12 || 12;
  return `${hr}:${String(m || 0).padStart(2, "0")} ${ampm}`;
}

export function combineDateTime(iso: string, hhmm: string): Date {
  const d = parseISODate(iso);
  const [h, m] = hhmm.split(":").map(Number);
  d.setHours(h || 0, m || 0, 0, 0);
  return d;
}

export function isValidISODate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = parseISODate(value);
  return todayISO(d) === value;
}

export function isValidHHMM(value: string): boolean {
  if (!/^\d{2}:\d{2}$/.test(value)) return false;
  const [h, m] = value.split(":").map(Number);
  return h >= 0 && h <= 23 && m >= 0 && m <= 59;
}
