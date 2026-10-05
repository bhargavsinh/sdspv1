import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, FileText } from "lucide-react";
import { PanchangStrip } from "@/components/panchang/panchang-strip";
import { SevaCard } from "@/components/seva/seva-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { addDays, formatMedium, formatTime } from "@/lib/calendar/dates";
import { APP_FULL, APP_GU } from "@/lib/sdsp/constants";
import { sevaStatusFor, useSdsp } from "@/lib/storage/store";
import { todayISO } from "@/lib/utils";

export function HomeDashboard() {
  const date = todayISO();
  const nityaAll = useSdsp((s) => s.nitya);
  const logs = useSdsp((s) => s.logs);
  const events = useSdsp((s) => s.events);
  const files = useSdsp((s) => s.files);
  const recents = useSdsp((s) => s.recents);
  const categories = useSdsp((s) => s.categories);
  const compact = useSdsp((s) => s.settings.dashboardCompact);
  const setStatus = useSdsp((s) => s.setSevaStatus);
  const clearStatus = useSdsp((s) => s.clearSevaStatus);

  const nitya = useMemo(
    () => nityaAll.filter((x) => x.enabled).sort((a, b) => a.order - b.order),
    [nityaAll],
  );

  const done = nitya.filter((s) => sevaStatusFor(logs, date, s.id) === "completed").length;
  const pct = nitya.length ? Math.round((done / nitya.length) * 100) : 0;
  const todayEvents = events.filter((e) => e.date === date);
  const utsav = todayEvents.filter((e) => e.categoryId === "cat_utsav" || categories.find((c) => c.id === e.categoryId)?.nameEn === "Utsav");
  const manorath = todayEvents.filter((e) => e.categoryId === "cat_manorath");
  const upcoming = events
    .filter((e) => e.date >= date && e.status === "upcoming")
    .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))
    .slice(0, 5);
  const pending = nitya.filter((s) => {
    const st = sevaStatusFor(logs, date, s.id);
    return st === "upcoming" || st === "in-progress";
  });
  const recentFiles = recents.filter((r) => r.kind === "file").slice(0, 5);
  const fileLookup = Object.fromEntries(files.map((f) => [f.id, f]));

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">{APP_FULL}</p>
          <h1 className="font-display mt-1 text-4xl font-semibold sm:text-5xl">SDSP</h1>
          <p className="gu mt-1 text-lg text-muted-foreground">{APP_GU}</p>
        </div>
        <div className="glass rounded-2xl px-5 py-4 text-right">
          <p className="text-xs text-muted-foreground">Today’s completion</p>
          <p className="font-display text-3xl font-semibold tabular-nums">{pct}%</p>
          <Progress value={pct} className="mt-2 w-36" />
        </div>
      </header>

      <PanchangStrip date={date} />

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl">Today’s Seva</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/planner">
              Planner <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {nitya.map((seva) => {
            const status = sevaStatusFor(logs, date, seva.id);
            return (
              <SevaCard
                key={seva.id}
                seva={seva}
                status={status}
                date={date}
                compact={compact}
                onComplete={() => {
                  if (status === "completed") void clearStatus(date, seva.id);
                  else void setStatus(date, seva.id, "completed");
                }}
                onSkip={() => void setStatus(date, seva.id, "skipped")}
              />
            );
          })}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="gu">આજનો ઉત્સવ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {utsav.length === 0 && <p className="text-sm text-muted-foreground">No utsav scheduled today.</p>}
            {utsav.map((e) => (
              <Link key={e.id} to="/event/$id" params={{ id: e.id }} className="block rounded-xl bg-secondary/50 p-3">
                <p className="font-medium">{e.title}</p>
                <p className="text-xs text-muted-foreground">{formatTime(e.startTime)}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="gu">આજનો મનોરથ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {manorath.length === 0 && <p className="text-sm text-muted-foreground">No manorath today.</p>}
            {manorath.map((e) => (
              <Link key={e.id} to="/event/$id" params={{ id: e.id }} className="block rounded-xl bg-secondary/50 p-3">
                <p className="font-medium">{e.title}</p>
                <p className="text-xs text-muted-foreground">{formatTime(e.startTime)}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending seva</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {pending.length === 0 && <p className="text-sm text-muted-foreground">All nitya seva complete.</p>}
            {pending.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="gu">{s.name}</span>
                <span className="tabular-nums text-muted-foreground">{formatTime(s.time)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Upcoming seva</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/seva">Open</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {upcoming.length === 0 && <p className="text-sm text-muted-foreground">Nothing upcoming.</p>}
            {upcoming.map((e) => (
              <Link key={e.id} to="/event/$id" params={{ id: e.id }} className="flex items-center justify-between rounded-xl p-2 hover:bg-accent">
                <span className="truncate pr-2">{e.title}</span>
                <span className="text-xs whitespace-nowrap text-muted-foreground">{formatMedium(e.date)}</span>
              </Link>
            ))}
            <p className="text-xs text-muted-foreground">Also look ahead to {formatMedium(addDays(date, 7))}.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Recent files</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/files">Library</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentFiles.length === 0 && (
              <p className="text-sm text-muted-foreground">Open a PDF or photograph to see it here.</p>
            )}
            {recentFiles.map((r) => (
              <Link key={r.id} to="/files" search={{ file: r.refId }} className="flex items-center gap-2 rounded-xl p-2 hover:bg-accent">
                <FileText className="size-4 text-muted-foreground" />
                <span className="truncate text-sm">{fileLookup[r.refId]?.name ?? r.title}</span>
                {fileLookup[r.refId]?.favorite && <Badge variant="secondary">Favorite</Badge>}
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
