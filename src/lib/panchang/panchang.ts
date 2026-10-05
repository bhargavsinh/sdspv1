import {
  GUJARATI_MONTHS,
  GUJARATI_WEEKDAYS,
  PAKSHA,
  TITHIS,
} from "@/lib/sdsp/constants";
import type { PanchangDay } from "@/lib/sdsp/types";
import { parseISODate } from "@/lib/utils";

/** Mean synodic month. Used only as a labelled estimate — never forced. */
const SYNODIC = 29.530588;
/** Approximate amavasya near Diwali 2026 (UTC noon). */
const KNOWN_AMA_MS = Date.UTC(2026, 9, 29, 6, 0, 0);

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function vsYearFor(date: Date, vsNewYearMd = "10-31"): number {
  const [mm, dd] = vsNewYearMd.split("-").map(Number);
  const month = Number.isFinite(mm) ? mm : 10;
  const day = Number.isFinite(dd) ? dd : 31;
  const y = date.getFullYear();
  const newYear = new Date(y, month - 1, day);
  return date >= startOfDay(newYear) ? y + 57 : y + 56;
}

export function estimatedLunar(date: Date): {
  tithi: string;
  paksha: "shukla" | "krishna";
  pakshaLabel: string;
  dayInCycle: number;
} {
  const ms = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 6, 0, 0);
  const days = (ms - KNOWN_AMA_MS) / 86_400_000;
  const cycle = ((days % SYNODIC) + SYNODIC) % SYNODIC;
  const idx = Math.min(29, Math.floor(cycle));
  const paksha: "shukla" | "krishna" = idx < 15 ? "shukla" : "krishna";
  const tithiIndex = idx % 15;
  let tithi: string;
  if (idx === 14) tithi = "પૂનમ";
  else if (idx === 29) tithi = "અમાસ";
  else tithi = TITHIS[tithiIndex] ?? "પડવો";
  return {
    tithi,
    paksha,
    pakshaLabel: PAKSHA[paksha].gu,
    dayInCycle: idx,
  };
}

export function estimatedGujaratiMonth(date: Date, vsNewYearMd = "10-31"): string {
  const [mm, dd] = vsNewYearMd.split("-").map(Number);
  const month = Number.isFinite(mm) ? mm : 10;
  const day = Number.isFinite(dd) ? dd : 31;
  const y = date.getFullYear();
  let newYear = new Date(y, month - 1, day);
  if (date < startOfDay(newYear)) newYear = new Date(y - 1, month - 1, day);
  const days = Math.floor((startOfDay(date).getTime() - startOfDay(newYear).getTime()) / 86_400_000);
  const idx = Math.min(11, Math.max(0, Math.floor(days / 30.44)));
  return GUJARATI_MONTHS[idx] ?? GUJARATI_MONTHS[0];
}

export function estimatePanchang(iso: string, vsNewYearMd = "10-31"): PanchangDay {
  const date = parseISODate(iso);
  const lunar = estimatedLunar(date);
  return {
    date: iso,
    vsYear: vsYearFor(date, vsNewYearMd),
    gujaratiMonth: estimatedGujaratiMonth(date, vsNewYearMd),
    tithi: lunar.tithi,
    paksha: lunar.pakshaLabel,
    manual: false,
  };
}

export function resolvePanchang(
  iso: string,
  overrides: Record<string, PanchangDay>,
  vsNewYearMd = "10-31",
): PanchangDay {
  const override = overrides[iso];
  if (override) return override;
  return estimatePanchang(iso, vsNewYearMd);
}

export function weekdayGu(iso: string): string {
  return GUJARATI_WEEKDAYS[parseISODate(iso).getDay()] ?? "";
}

export function formatVs(year: number): string {
  return `વિ.સં. ${year}`;
}
