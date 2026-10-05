import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/seva/status-badge";
import { formatMedium } from "@/lib/calendar/dates";
import { useSdsp } from "@/lib/storage/store";

export function HistoryBoard() {
  const logsMap = useSdsp((s) => s.logs);
  const nitya = useSdsp((s) => s.nitya);
  const events = useSdsp((s) => s.events);
  const [q, setQ] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const logs = useMemo(() => Object.values(logsMap), [logsMap]);

  const rows = useMemo(() => {
    return logs
      .filter((l) => {
        if (from && l.date < from) return false;
        if (to && l.date > to) return false;
        const seva = nitya.find((s) => s.id === l.sevaId);
        const hay = `${seva?.name ?? ""} ${seva?.nameEn ?? ""} ${l.status} ${l.note ?? ""}`.toLowerCase();
        if (q && !hay.includes(q.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => b.date.localeCompare(a.date) || b.updatedAt.localeCompare(a.updatedAt));
  }, [logs, from, to, q, nitya]);

  const grouped = rows.reduce<Record<string, typeof rows>>((acc, row) => {
    acc[row.date] ??= [];
    acc[row.date].push(row);
    return acc;
  }, {});

  const eventHistory = events.filter((e) => e.status === "completed" || e.status === "skipped");

  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-display text-3xl font-semibold">Seva history</h1>
        <p className="text-sm text-muted-foreground">Date-wise record of completed and skipped seva.</p>
      </header>
      <div className="flex flex-wrap gap-2">
        <Input placeholder="Search seva or status" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-xs" />
        <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From" />
        <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} aria-label="To" />
      </div>
      {Object.keys(grouped).length === 0 && <p className="text-sm text-muted-foreground">No history yet. Complete a seva to begin the ledger.</p>}
      {Object.entries(grouped).map(([date, list]) => (
        <section key={date} className="glass rounded-2xl p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-medium">{formatMedium(date)}</h2>
            <Link to="/calendar/$date" params={{ date }} className="text-sm text-primary">
              Open day
            </Link>
          </div>
          <ul className="space-y-2">
            {list.map((l) => {
              const seva = nitya.find((s) => s.id === l.sevaId);
              return (
                <li key={l.id} className="flex items-center justify-between gap-2">
                  <span className="gu">{seva?.name ?? l.sevaId}</span>
                  <StatusBadge status={l.status} />
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      {eventHistory.length > 0 && (
        <section>
          <h2 className="font-display mb-2 text-xl">Completed vishesh</h2>
          <ul className="space-y-2">
            {eventHistory.map((e) => (
              <li key={e.id}>
                <Link to="/event/$id" params={{ id: e.id }} className="glass flex items-center justify-between rounded-2xl p-3">
                  <span>{e.title}</span>
                  <StatusBadge status={e.status} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
