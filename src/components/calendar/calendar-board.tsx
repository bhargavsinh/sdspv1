import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  addDays,
  formatMedium,
  formatMonthYear,
  formatTime,
  monthGrid,
  sameMonth,
  startOfMonth,
  weekDays,
  yearMonths,
} from "@/lib/calendar/dates";
import { EN_WEEKDAYS } from "@/lib/sdsp/constants";
import type { CalendarView, VisheshEvent } from "@/lib/sdsp/types";
import { sevaStatusFor, useSdsp } from "@/lib/storage/store";
import { cn, parseISODate, todayISO } from "@/lib/utils";
import { resolvePanchang } from "@/lib/panchang/panchang";

function eventsOn(events: VisheshEvent[], date: string) {
  return events.filter((e) => e.date === date || (e.endDate && e.date <= date && e.endDate >= date));
}

export function CalendarBoard({ initialView }: { initialView?: CalendarView }) {
  const today = todayISO();
  const settings = useSdsp((s) => s.settings);
  const [view, setView] = useState<CalendarView>(initialView ?? settings.calendarDefaultView);
  const [cursor, setCursor] = useState(today);
  const nityaAll = useSdsp((s) => s.nitya);
  const logs = useSdsp((s) => s.logs);
  const events = useSdsp((s) => s.events);
  const panchang = useSdsp((s) => s.panchang);
  const nitya = useMemo(() => nityaAll.filter((s) => s.enabled), [nityaAll]);

  const cells = useMemo(() => monthGrid(cursor), [cursor]);
  const week = useMemo(() => weekDays(cursor), [cursor]);
  const year = parseISODate(cursor).getFullYear();

  const shift = (dir: number) => {
    if (view === "day") setCursor(addDays(cursor, dir));
    else if (view === "week" || view === "agenda") setCursor(addDays(cursor, dir * 7));
    else if (view === "year") setCursor(todayISO(new Date(year + dir, 0, 1)));
    else setCursor(todayISO(new Date(parseISODate(cursor).getFullYear(), parseISODate(cursor).getMonth() + dir, 1)));
  };

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl font-semibold">Calendar</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => shift(-1)} aria-label="Previous">
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="ghost" onClick={() => setCursor(today)}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={() => shift(1)} aria-label="Next">
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </header>
      <p className="text-muted-foreground">{view === "year" ? year : formatMonthYear(cursor)}</p>
      <Tabs value={view} onValueChange={(v) => setView(v as CalendarView)}>
        <TabsList className="flex w-full flex-wrap">
          {(["day", "week", "month", "year", "agenda"] as const).map((v) => (
            <TabsTrigger key={v} value={v} className="flex-1 capitalize">
              {v}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {view === "month" && (
        <div className="glass overflow-hidden rounded-2xl">
          <div className="grid grid-cols-7 border-b border-border text-center text-[11px] tracking-wide text-muted-foreground uppercase">
            {Array.from({ length: 7 }, (_, i) => EN_WEEKDAYS[(i + 1) % 7]?.slice(0, 3)).map((d) => (
              <div key={d} className="py-2">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((iso) => {
              const inMonth = sameMonth(iso, cursor);
              const ev = eventsOn(events, iso);
              const done = nitya.filter((s) => sevaStatusFor(logs, iso, s.id) === "completed").length;
              return (
                <Link
                  key={iso}
                  to="/calendar/$date"
                  params={{ date: iso }}
                  className={cn(
                    "min-h-20 border-border border-r border-b p-2 hover:bg-accent",
                    !inMonth && "opacity-40",
                    iso === today && "bg-primary/10",
                  )}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="tabular-nums">{parseISODate(iso).getDate()}</span>
                    {done > 0 && <span className="text-complete">{done}</span>}
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {ev.slice(0, 2).map((e) => (
                      <div key={e.id} className="truncate rounded bg-primary/15 px-1 text-[10px] text-primary">
                        {e.title}
                      </div>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {view === "week" && (
        <div className="grid gap-3 md:grid-cols-7">
          {week.map((iso) => (
            <Link key={iso} to="/calendar/$date" params={{ date: iso }} className="glass rounded-2xl p-3">
              <p className="text-xs text-muted-foreground">{formatMedium(iso)}</p>
              <ul className="mt-2 space-y-1 text-sm">
                {nitya.slice(0, 4).map((s) => (
                  <li key={s.id} className="gu truncate text-xs">
                    {s.name}
                  </li>
                ))}
                {eventsOn(events, iso).map((e) => (
                  <li key={e.id} className="truncate text-xs text-primary">
                    {e.title}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      )}

      {view === "day" && <DayAgenda date={cursor} />}

      {view === "year" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {yearMonths(year).map((m) => (
            <button
              key={m}
              type="button"
              className="glass rounded-2xl p-4 text-left hover:bg-accent"
              onClick={() => {
                setCursor(m);
                setView("month");
              }}
            >
              <p className="font-medium">{formatMonthYear(m)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {events.filter((e) => e.date.startsWith(m.slice(0, 7))).length} vishesh
              </p>
            </button>
          ))}
        </div>
      )}

      {view === "agenda" && (
        <div className="space-y-3">
          {Array.from({ length: 14 }, (_, i) => addDays(startOfMonth(cursor), i)).map((iso) => {
            const ev = eventsOn(events, iso);
            const pan = resolvePanchang(iso, panchang, settings.vsNewYearMd);
            return (
              <Link key={iso} to="/calendar/$date" params={{ date: iso }} className="glass block rounded-2xl p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium">{formatMedium(iso)}</p>
                  <p className="gu text-xs text-muted-foreground">
                    {pan.tithi} · {pan.paksha}
                  </p>
                </div>
                {ev.length === 0 ? (
                  <p className="mt-1 text-sm text-muted-foreground">Nitya seva only</p>
                ) : (
                  <ul className="mt-2 space-y-1 text-sm">
                    {ev.map((e) => (
                      <li key={e.id}>{e.title}</li>
                    ))}
                  </ul>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function DayAgenda({ date }: { date: string }) {
  const nityaAll = useSdsp((s) => s.nitya);
  const logs = useSdsp((s) => s.logs);
  const eventsAll = useSdsp((s) => s.events);
  const setStatus = useSdsp((s) => s.setSevaStatus);
  const nitya = useMemo(
    () => nityaAll.filter((s) => s.enabled).sort((a, b) => a.order - b.order),
    [nityaAll],
  );
  const events = useMemo(() => eventsAll.filter((e) => e.date === date), [eventsAll, date]);

  return (
    <div className="space-y-3">
      {nitya.map((s) => {
        const status = sevaStatusFor(logs, date, s.id);
        return (
          <div key={s.id} className="glass flex items-center gap-3 rounded-2xl p-4">
            <div className="w-16 text-xs tabular-nums text-muted-foreground">{formatTime(s.time)}</div>
            <div className="min-w-0 flex-1">
              <p className="gu font-medium">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.nameEn} · {status}</p>
            </div>
            <Button size="sm" variant={status === "completed" ? "secondary" : "default"} onClick={() => void setStatus(date, s.id, "completed")}>
              Done
            </Button>
          </div>
        );
      })}
      {events.map((e) => (
        <Link key={e.id} to="/event/$id" params={{ id: e.id }} className="glass block rounded-2xl p-4">
          <p className="text-xs text-muted-foreground">
            {formatTime(e.startTime)} – {formatTime(e.endTime)}
          </p>
          <p className="font-medium">{e.title}</p>
        </Link>
      ))}
    </div>
  );
}
