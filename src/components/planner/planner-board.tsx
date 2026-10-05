import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { addDays, formatMedium, monthGrid, startOfWeek, weekDays, yearMonths, formatMonthYear, sameMonth } from "@/lib/calendar/dates";
import { sevaStatusFor, useSdsp } from "@/lib/storage/store";
import { parseISODate, todayISO } from "@/lib/utils";
import type { DailySevaLog } from "@/lib/sdsp/types";

type Span = "week" | "month" | "year";

function completion(logs: Record<string, DailySevaLog>, nityaIds: string[], date: string) {
  if (!nityaIds.length) return 0;
  const done = nityaIds.filter((id) => sevaStatusFor(logs, date, id) === "completed").length;
  return Math.round((done / nityaIds.length) * 100);
}

export function PlannerBoard() {
  const today = todayISO();
  const [span, setSpan] = useState<Span>("week");
  const nityaAll = useSdsp((s) => s.nitya);
  const logs = useSdsp((s) => s.logs);
  const events = useSdsp((s) => s.events);
  const nitya = useMemo(() => nityaAll.filter((x) => x.enabled), [nityaAll]);
  const ids = nitya.map((s) => s.id);

  const week = useMemo(() => weekDays(today), [today]);
  const month = useMemo(() => monthGrid(today), [today]);
  const year = parseISODate(today).getFullYear();

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-display text-3xl font-semibold">Seva planner</h1>
        <p className="text-sm text-muted-foreground">Week, month and year at a glance.</p>
      </header>
      <Tabs value={span} onValueChange={(v) => setSpan(v as Span)}>
        <TabsList>
          <TabsTrigger value="week">Weekly</TabsTrigger>
          <TabsTrigger value="month">Monthly</TabsTrigger>
          <TabsTrigger value="year">Yearly</TabsTrigger>
        </TabsList>
      </Tabs>

      {span === "week" && (
        <div className="grid gap-3 md:grid-cols-7">
          {week.map((iso) => {
            const pct = completion(logs, ids, iso);
            return (
              <Link key={iso} to="/calendar/$date" params={{ date: iso }} className="glass rounded-2xl p-3">
                <p className="text-xs text-muted-foreground">{formatMedium(iso)}</p>
                <p className="mt-2 font-display text-2xl tabular-nums">{pct}%</p>
                <Progress value={pct} className="mt-2" />
                <ul className="mt-3 space-y-1 text-xs">
                  {events
                    .filter((e) => e.date === iso)
                    .slice(0, 3)
                    .map((e) => (
                      <li key={e.id} className="truncate text-primary">
                        {e.title}
                      </li>
                    ))}
                </ul>
              </Link>
            );
          })}
        </div>
      )}

      {span === "month" && (
        <div className="grid grid-cols-7 gap-1">
          {month.map((iso) => (
            <Link
              key={iso}
              to="/calendar/$date"
              params={{ date: iso }}
              className="rounded-xl bg-secondary/40 p-2 text-center text-xs"
            >
              <div className={sameMonth(iso, today) ? "" : "opacity-40"}>{parseISODate(iso).getDate()}</div>
              <div className="text-complete tabular-nums">{completion(logs, ids, iso)}%</div>
            </Link>
          ))}
        </div>
      )}

      {span === "year" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {yearMonths(year).map((m) => {
            const days = Array.from({ length: 28 }, (_, i) => addDays(m, i));
            const avg = Math.round(days.reduce((a, d) => a + completion(logs, ids, d), 0) / days.length);
            return (
              <div key={m} className="glass rounded-2xl p-4">
                <p className="font-medium">{formatMonthYear(m)}</p>
                <p className="text-sm text-muted-foreground">Approx. completion {avg}%</p>
                <Progress value={avg} className="mt-2" />
              </div>
            );
          })}
        </div>
      )}
      <p className="text-xs text-muted-foreground">Week of {formatMedium(startOfWeek(today))}.</p>
    </div>
  );
}
