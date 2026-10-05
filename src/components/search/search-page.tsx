import { useMemo, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { searchSdsp, type SearchKind } from "@/lib/search/search";
import { useSdsp } from "@/lib/storage/store";

const KINDS: { id: SearchKind; label: string }[] = [
  { id: "seva", label: "Seva" },
  { id: "event", label: "Events" },
  { id: "file", label: "Files" },
  { id: "note", label: "Notes" },
  { id: "folder", label: "Folders" },
  { id: "procedure", label: "Pranalika" },
  { id: "tag", label: "Tags" },
];

export function SearchPage({ initialQuery = "" }: { initialQuery?: string }) {
  const [q, setQ] = useState(initialQuery);
  const [kinds, setKinds] = useState<SearchKind[]>([]);
  const [favorite, setFavorite] = useState(false);
  const [fileKind, setFileKind] = useState<"" | "pdf" | "image">("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const nitya = useSdsp((s) => s.nitya);
  const events = useSdsp((s) => s.events);
  const notes = useSdsp((s) => s.notes);
  const files = useSdsp((s) => s.files);
  const folders = useSdsp((s) => s.folders);
  const procedures = useSdsp((s) => s.procedures);
  const categories = useSdsp((s) => s.categories);
  const panchang = useSdsp((s) => s.panchang);
  const router = useRouter();
  const hits = useMemo(
    () =>
      searchSdsp(
        { nitya, events, notes, files, folders, procedures, categories, panchang },
        q,
        {
          kinds: kinds.length ? kinds : undefined,
          favorite: favorite || undefined,
          fileKind: fileKind || undefined,
          dateFrom: from || undefined,
          dateTo: to || undefined,
        },
      ),
    [nitya, events, notes, files, folders, procedures, categories, panchang, q, kinds, favorite, fileKind, from, to],
  );

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-semibold">Search</h1>
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Seva, dates, PDFs, photographs, notes, tags…" />
      <div className="flex flex-wrap gap-2">
        {KINDS.map((k) => {
          const on = kinds.includes(k.id);
          return (
            <button
              key={k.id}
              type="button"
              className={`h-9 rounded-full px-3 text-xs ${on ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
              onClick={() => setKinds(on ? kinds.filter((x) => x !== k.id) : [...kinds, k.id])}
            >
              {k.label}
            </button>
          );
        })}
        <button
          type="button"
          className={`h-9 rounded-full px-3 text-xs ${favorite ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
          onClick={() => setFavorite((v) => !v)}
        >
          Favorites
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <select
          className="h-11 rounded-lg border border-input bg-background px-3 text-sm"
          value={fileKind}
          onChange={(e) => setFileKind(e.target.value as typeof fileKind)}
        >
          <option value="">Any file type</option>
          <option value="pdf">PDF</option>
          <option value="image">Image</option>
        </select>
        <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From" className="max-w-40" />
        <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} aria-label="To" className="max-w-40" />
      </div>
      <ul className="space-y-2">
        {hits.map((hit) => (
          <li key={`${hit.kind}-${hit.id}`}>
            <button
              type="button"
              className="glass w-full rounded-2xl p-4 text-left"
              onClick={() => router.history.push(hit.href)}
            >
              <p className="font-medium">{hit.title}</p>
              <p className="text-xs text-muted-foreground">
                {hit.kind} · {hit.subtitle}
              </p>
            </button>
          </li>
        ))}
      </ul>
      {hits.length === 0 && <p className="text-sm text-muted-foreground">No matching seva, files or notes.</p>}
    </div>
  );
}
