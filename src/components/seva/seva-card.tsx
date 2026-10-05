import { Link } from "@tanstack/react-router";
import { Bell, Check, FileText, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SevaIcon } from "@/components/seva/seva-icons";
import { StatusBadge } from "@/components/seva/status-badge";
import { formatTime } from "@/lib/calendar/dates";
import type { NityaSeva, SevaStatus } from "@/lib/sdsp/types";
import { cn } from "@/lib/utils";

export function SevaCard({
  seva,
  status,
  date,
  compact,
  onComplete,
  onSkip,
}: {
  seva: NityaSeva;
  status: SevaStatus;
  date: string;
  compact?: boolean;
  onComplete: () => void;
  onSkip: () => void;
}) {
  return (
    <article
      className={cn(
        "glass relative overflow-hidden rounded-2xl p-4 transition-[box-shadow,transform] duration-200",
        status === "completed" && "opacity-80",
      )}
    >
      <div className="flex items-start gap-3">
        <SevaIcon name={seva.icon} className="size-12 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Link to="/seva/$id" params={{ id: seva.id }} className="min-w-0">
              <h3 className="gu truncate font-display text-xl font-semibold">{seva.name}</h3>
              <p className="text-xs text-muted-foreground">{seva.nameEn}</p>
            </Link>
            <StatusBadge status={status} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="tabular-nums">{formatTime(seva.time)}</span>
            <span>{seva.durationMin} min</span>
            {seva.reminderOffsets.length > 0 && (
              <span className="inline-flex items-center gap-1">
                <Bell className="size-3" /> {seva.reminderOffsets[0]}m
              </span>
            )}
            {seva.attachmentIds.length > 0 && (
              <span className="inline-flex items-center gap-1">
                <FileText className="size-3" /> {seva.attachmentIds.length}
              </span>
            )}
          </div>
          {!compact && seva.description && (
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{seva.description}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" onClick={onComplete} disabled={status === "completed"}>
              <Check className="size-4" /> Complete
            </Button>
            <Button size="sm" variant="outline" onClick={onSkip} disabled={status === "skipped"}>
              <SkipForward className="size-4" /> Skip
            </Button>
            <Button size="sm" variant="ghost" asChild>
              <Link to="/calendar/$date" params={{ date }}>
                Day
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
