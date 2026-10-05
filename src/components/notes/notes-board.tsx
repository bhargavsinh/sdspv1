import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSdsp } from "@/lib/storage/store";
import type { NoteItem } from "@/lib/sdsp/types";

export function NotesBoard({ initialId }: { initialId?: string }) {
  const notesAll = useSdsp((s) => s.notes);
  const add = useSdsp((s) => s.addNote);
  const upsert = useSdsp((s) => s.upsertNote);
  const remove = useSdsp((s) => s.removeNote);
  const nitya = useSdsp((s) => s.nitya);
  const notes = useMemo(() => notesAll.filter((n) => !n.archived), [notesAll]);
  const [activeId, setActiveId] = useState(initialId ?? notes[0]?.id);
  const [pending, setPending] = useState<string | null>(null);
  const active = notes.find((n) => n.id === activeId) ?? notes[0];

  const save = (patch: Partial<NoteItem>) => {
    if (!active) return;
    void upsert({ ...active, ...patch, updatedAt: new Date().toISOString() });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
      <aside className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl">Notes</h1>
          <Button
            size="icon"
            variant="outline"
            aria-label="New note"
            onClick={async () => {
              const n = await add({ title: "New note" });
              setActiveId(n.id);
            }}
          >
            <Plus className="size-4" />
          </Button>
        </div>
        {notes.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => setActiveId(n.id)}
            className={`w-full rounded-xl px-3 py-2 text-left text-sm ${n.id === active?.id ? "bg-primary text-primary-foreground" : "glass"}`}
          >
            <span className="block truncate font-medium">{n.title}</span>
            <span className="block text-[11px] opacity-70">{n.private ? "Private" : "Shared on device"}</span>
          </button>
        ))}
      </aside>
      {active ? (
        <div className="space-y-3">
          <Input value={active.title} onChange={(e) => save({ title: e.target.value })} />
          <Textarea className="min-h-64" value={active.body} onChange={(e) => save({ body: e.target.value })} />
          <Input
            placeholder="Tags, comma separated"
            value={active.tags.join(", ")}
            onChange={(e) =>
              save({
                tags: e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
              })
            }
          />
          <div className="grid gap-1.5">
            <label className="text-sm font-medium">Link to seva</label>
            <select
              className="h-11 rounded-lg border border-input bg-background px-3 text-sm"
              value={active.sevaId ?? ""}
              onChange={(e) => save({ sevaId: e.target.value || undefined })}
            >
              <option value="">None</option>
              {nitya.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nameEn}
                </option>
              ))}
            </select>
          </div>
          <label className="flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3 text-sm">
            Private personal note
            <Switch checked={active.private} onCheckedChange={(v) => save({ private: v })} />
          </label>
          <Button variant="destructive" onClick={() => setPending(active.id)}>
            <Trash2 className="size-4" /> Delete
          </Button>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Create a note to begin.</p>
      )}

      <AlertDialog open={Boolean(pending)} onOpenChange={(o) => !o && setPending(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this note?</AlertDialogTitle>
            <AlertDialogDescription>You can undo from the toast right after.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pending) void remove(pending);
                setPending(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
