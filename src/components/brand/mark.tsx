import { cn } from "@/lib/utils";

export function LotusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("text-primary", className)} aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="currentColor" opacity="0.12" />
      <path
        d="M24 38c-6-6.5-11-12.2-11-18.2C13 13.6 17.4 10 24 10s11 3.6 11 9.8C35 25.8 30 31.5 24 38Z"
        fill="currentColor"
      />
      <path
        d="M24 36c-4.8-5.4-8-9.8-8-14.2C16 16.8 19.2 14 24 14s8 2.8 8 7.8C32 26.2 28.8 30.6 24 36Z"
        fill="var(--sdsp-ivory)"
        opacity="0.9"
      />
      <circle cx="24" cy="21" r="3.2" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <LotusMark className="size-10 shrink-0" />
      <div className="min-w-0 leading-tight">
        <div className="font-display text-2xl font-semibold tracking-tight">SDSP</div>
        {!compact && (
          <div className="gu truncate text-xs tracking-wide text-muted-foreground">શ્રી દેવદમનલાલ</div>
        )}
      </div>
    </div>
  );
}
