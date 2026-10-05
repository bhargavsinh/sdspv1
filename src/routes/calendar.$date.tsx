import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PanchangStrip } from "@/components/panchang/panchang-strip";
import { DayAgenda } from "@/components/calendar/calendar-board";
import { SevaCard } from "@/components/seva/seva-card";
import { sevaStatusFor, useSdsp } from "@/lib/storage/store";
import { formatLong, isValidISODate } from "@/lib/calendar/dates";

export const Route = createFileRoute("/calendar/$date")({ component: DayPage });

function DayPage() {
  const { date } = Route.useParams();
  const valid = isValidISODate(date);
  const nityaAll = useSdsp((s) => s.nitya);
  const logs = useSdsp((s) => s.logs);
  const setStatus = useSdsp((s) => s.setSevaStatus);
  const clearStatus = useSdsp((s) => s.clearSevaStatus);
  const nitya = useMemo(
    () => nityaAll.filter((x) => x.enabled).sort((a, b) => a.order - b.order),
    [nityaAll],
  );

  if (!valid) {
    return <p className="text-sm text-destructive">That date is not valid.</p>;
  }

  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs tracking-widest text-muted-foreground uppercase">Seva dashboard</p>
        <h1 className="font-display text-3xl font-semibold">{formatLong(date)}</h1>
      </header>
      <PanchangStrip date={date} />
      <section className="grid gap-3 md:grid-cols-2">
        {nitya.map((seva) => {
          const status = sevaStatusFor(logs, date, seva.id);
          return (
            <SevaCard
              key={seva.id}
              seva={seva}
              status={status}
              date={date}
              onComplete={() => {
                if (status === "completed") void clearStatus(date, seva.id);
                else void setStatus(date, seva.id, "completed");
              }}
              onSkip={() => void setStatus(date, seva.id, "skipped")}
            />
          );
        })}
      </section>
      <section>
        <h2 className="font-display mb-3 text-2xl">Timeline</h2>
        <DayAgenda date={date} />
      </section>
    </div>
  );
}
