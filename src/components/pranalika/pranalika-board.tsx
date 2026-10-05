import { useMemo, useState } from "react";
import { Bookmark, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MediaViewer } from "@/components/viewers/media-viewer";
import { useSdsp } from "@/lib/storage/store";
import type { StoredFileMeta } from "@/lib/sdsp/types";

export function PranalikaBoard({ initialId }: { initialId?: string }) {
  const proceduresAll = useSdsp((s) => s.procedures);
  const add = useSdsp((s) => s.addProcedure);
  const upsert = useSdsp((s) => s.upsertProcedure);
  const saveVersion = useSdsp((s) => s.saveProcedureVersion);
  const ingest = useSdsp((s) => s.ingestFiles);
  const nitya = useSdsp((s) => s.nitya);
  const files = useSdsp((s) => s.files);
  const procedures = useMemo(() => proceduresAll.filter((p) => !p.archived), [proceduresAll]);
  const [activeId, setActiveId] = useState(initialId ?? procedures[0]?.id);
  const [q, setQ] = useState("");
  const [viewer, setViewer] = useState<StoredFileMeta | null>(null);
  const active = procedures.find((p) => p.id === activeId) ?? procedures[0];
  const visible = procedures.filter((p) => {
    if (!q) return true;
    const hay = `${p.title} ${p.body} ${p.notes} ${p.tags.join(" ")}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold">Seva Pranalika</h1>
          <p className="text-sm text-muted-foreground">
            Written procedures, versions, and original PDFs. Uploaded documents are never rewritten.
          </p>
        </div>
        <Button
          onClick={async () => {
            const p = await add();
            setActiveId(p.id);
          }}
        >
          <Plus className="size-4" /> New procedure
        </Button>
      </header>
      <Input placeholder="Search procedures, tags, notes" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-2">
          {visible.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`w-full rounded-xl px-3 py-2 text-left ${p.id === active?.id ? "bg-primary text-primary-foreground" : "glass"}`}
              onClick={() => setActiveId(p.id)}
            >
              <span className="flex items-center gap-2 text-sm font-medium">
                {p.bookmarked && <Bookmark className="size-3.5" />}
                <span className="truncate">{p.title}</span>
              </span>
              <span className="text-[11px] opacity-70">v{p.version}</span>
            </button>
          ))}
        </aside>
        {active ? (
          <div className="space-y-3">
            <Input value={active.title} onChange={(e) => void upsert({ ...active, title: e.target.value })} />
            <Textarea
              className="min-h-56"
              value={active.body}
              onChange={(e) => void upsert({ ...active, body: e.target.value, updatedAt: new Date().toISOString() })}
            />
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => void saveVersion(active.id, active.body)}>
                Save version {active.version + 1}
              </Button>
              <Button
                variant={active.bookmarked ? "default" : "outline"}
                onClick={() => void upsert({ ...active, bookmarked: !active.bookmarked })}
              >
                <Bookmark className="size-4" /> Bookmark
              </Button>
            </div>
            <label className="text-sm">
              Assign to seva
              <select
                className="mt-1 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
                value={active.sevaIds[0] ?? ""}
                onChange={(e) => void upsert({ ...active, sevaIds: e.target.value ? [e.target.value] : [] })}
              >
                <option value="">Unassigned</option>
                {nitya.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} · {s.nameEn}
                  </option>
                ))}
              </select>
            </label>
            <Input
              placeholder="Tags"
              value={active.tags.join(", ")}
              onChange={(e) =>
                void upsert({
                  ...active,
                  tags: e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                })
              }
            />
            <Textarea
              placeholder="Notes"
              value={active.notes}
              onChange={(e) => void upsert({ ...active, notes: e.target.value })}
            />
            <label className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg border border-border px-4 text-sm">
              <Upload className="size-4" /> Upload pranalika PDF or image
              <input
                type="file"
                className="sr-only"
                accept=".pdf,.jpg,.jpeg,.png,.webp,.gif"
                multiple
                onChange={(e) => {
                  const list = e.target.files ? Array.from(e.target.files) : [];
                  void ingest(list, "folder_pranalika").then((created) => {
                    void upsert({ ...active, fileIds: [...active.fileIds, ...created.map((c) => c.id)] });
                  });
                  e.target.value = "";
                }}
              />
            </label>
            <ul className="space-y-1">
              {active.fileIds.map((id) => {
                const f = files.find((x) => x.id === id);
                if (!f) return null;
                return (
                  <li key={id}>
                    <button type="button" className="text-sm text-primary" onClick={() => setViewer(f)}>
                      {f.name}
                    </button>
                  </li>
                );
              })}
            </ul>
            {active.versions.length > 1 && (
              <details className="text-sm">
                <summary className="cursor-pointer">Version history</summary>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  {active.versions.map((v) => (
                    <li key={v.version}>
                      v{v.version} · {new Date(v.createdAt).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Create a written procedure or upload a pranalika PDF.</p>
        )}
      </div>
      <MediaViewer file={viewer} onClose={() => setViewer(null)} />
    </div>
  );
}
