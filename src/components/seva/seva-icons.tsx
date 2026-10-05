import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

function Frame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("text-primary", className)} aria-hidden="true">
      <rect x="2" y="2" width="60" height="60" rx="16" fill="currentColor" opacity="0.12" />
      {children}
    </svg>
  );
}

export function SevaIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "shankh":
      return (
        <Frame className={className}>
          <path d="M18 34c0-10 8-18 18-16 6 1 10 7 10 14 0 10-8 16-16 16-8 0-12-6-12-14Z" fill="currentColor" />
          <path d="M28 28c4-8 14-8 16 0" stroke="var(--sdsp-ivory)" strokeWidth="2.4" fill="none" />
          <circle cx="40" cy="32" r="3" fill="var(--sdsp-ivory)" />
        </Frame>
      );
    case "mangala":
      return (
        <Frame className={className}>
          <circle cx="32" cy="28" r="10" fill="currentColor" />
          <path d="M32 10v6M32 40v6M14 28h6M44 28h6M19 16l4 4M41 40l4 4M19 40l4-4M41 16l4-4" stroke="currentColor" strokeWidth="2.5" />
        </Frame>
      );
    case "shringar":
      return (
        <Frame className={className}>
          <path d="M20 24h24v6c0 8-5 14-12 14s-12-6-12-14v-6Z" fill="currentColor" />
          <rect x="26" y="16" width="12" height="8" rx="2" fill="currentColor" />
          <circle cx="32" cy="30" r="3" fill="var(--sdsp-ivory)" />
        </Frame>
      );
    case "rajbhog":
      return (
        <Frame className={className}>
          <ellipse cx="32" cy="40" rx="16" ry="6" fill="currentColor" />
          <path d="M16 40c2-12 8-18 16-18s14 6 16 18" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="32" cy="26" r="4" fill="currentColor" />
        </Frame>
      );
    case "utthapan":
      return (
        <Frame className={className}>
          <path d="M18 42h28L32 16 18 42Z" fill="currentColor" />
          <path d="M32 22v14" stroke="var(--sdsp-ivory)" strokeWidth="2.5" />
          <path d="M26 30h12" stroke="var(--sdsp-ivory)" strokeWidth="2.5" />
        </Frame>
      );
    case "sandhya":
      return (
        <Frame className={className}>
          <path d="M20 40h24v4H20z" fill="currentColor" />
          <path d="M24 40c2-12 8-18 8-18s6 6 8 18" fill="currentColor" />
          <circle cx="32" cy="22" r="4" fill="currentColor" />
        </Frame>
      );
    case "shayan":
      return (
        <Frame className={className}>
          <path d="M14 38h36v6H14z" fill="currentColor" />
          <circle cx="22" cy="28" r="6" fill="currentColor" />
          <path d="M28 34h18v4H28z" fill="currentColor" />
        </Frame>
      );
    default:
      return (
        <Frame className={className}>
          <circle cx="32" cy="32" r="10" fill="currentColor" />
        </Frame>
      );
  }
}
