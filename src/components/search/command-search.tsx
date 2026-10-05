import { useEffect, useMemo, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchSdsp, type Searchable } from "@/lib/search/search";
import { useSdsp } from "@/lib/storage/store";

export function CommandSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();
  const nitya = useSdsp((s) => s.nitya);
  const events = useSdsp((s) => s.events);
  const notes = useSdsp((s) => s.notes);
  const files = useSdsp((s) => s.files);
  const folders = useSdsp((s) => s.folders);
  const procedures = useSdsp((s) => s.procedures);
  const categories = useSdsp((s) => s.categories);
  const panchang = useSdsp((s) => s.panchang);
  const state = useMemo<Searchable>(
    () => ({ nitya, events, notes, files, folders, procedures, categories, panchang }),
    [nitya, events, notes, files, folders, procedures, categories, panchang],
  );
  const hits = useMemo(() => searchSdsp(state, q), [state, q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      const tag = (e.target as HTMLElement).tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="hidden h-10 min-w-48 justify-between text-muted-foreground sm:inline-flex"
        onClick={() => setOpen(true)}
      >
        Search seva, files, dates
        <kbd className="rounded-md border border-border px-1.5 text-[10px]">
          <Command className="mr-0.5 inline size-3" />K
        </kbd>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 sm:max-w-lg">
          <DialogHeader className="px-5 pt-5">
            <DialogTitle>Global search</DialogTitle>
          </DialogHeader>
          <div className="px-5">
            <Input
              autoFocus
              placeholder="Seva, utsav, notes, PDFs, tags…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search SDSP"
            />
          </div>
          <ul className="max-h-80 overflow-auto px-2 pb-4">
            {hits.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted-foreground">No matches.</li>}
            {hits.map((hit) => (
              <li key={`${hit.kind}-${hit.id}`}>
                <button
                  type="button"
                  className="flex w-full flex-col rounded-xl px-3 py-2 text-left hover:bg-accent"
                  onClick={() => {
                    setOpen(false);
                    router.history.push(hit.href);
                  }}
                >
                  <span className="text-sm font-medium">{hit.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {hit.kind} · {hit.subtitle}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
