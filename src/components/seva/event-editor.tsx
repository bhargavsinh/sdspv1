import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STATUS_LABEL, GUJARATI_MONTHS, REMINDER_PRESETS } from "@/lib/sdsp/constants";
import type { SevaStatus, VisheshEvent } from "@/lib/sdsp/types";
import { useSdsp } from "@/lib/storage/store";
import { isValidHHMM, isValidISODate } from "@/lib/calendar/dates";

export function EventEditor({ event }: { event: VisheshEvent }) {
  const upsert = useSdsp((s) => s.upsertEvent);
  const remove = useSdsp((s) => s.removeEvent);
  const duplicate = useSdsp((s) => s.duplicateEvent);
  const ingest = useSdsp((s) => s.ingestFiles);
  const categories = useSdsp((s) => s.categories);
  const files = useSdsp((s) => s.files);
  const [draft, setDraft] = useState(event);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    if (!isValidISODate(draft.date) || !isValidHHMM(draft.startTime)) return;
    await upsert({ ...draft, updatedAt: new Date().toISOString() });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <p className="text-sm">
        <Link to="/seva" className="text-muted-foreground hover:text-foreground">
          Seva
        </Link>
        <span className="px-2 text-muted-foreground">/</span>
        {draft.title}
      </p>
      <h1 className="font-display text-3xl">Vishesh seva</h1>
      <div className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
        </div>
        <div className="grid gap-1.5">
          <Label>Category</Label>
          <Select value={draft.categoryId} onValueChange={(v) => setDraft({ ...draft, categoryId: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories
                .filter((c) => c.kind !== "nitya")
                .map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name} · {c.nameEn}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="vs">Vikram Samvat</Label>
            <Input
              id="vs"
              type="number"
              value={draft.vsYear ?? ""}
              onChange={(e) => setDraft({ ...draft, vsYear: Number(e.target.value) || undefined })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="start">Start</Label>
            <Input id="start" type="time" value={draft.startTime} onChange={(e) => setDraft({ ...draft, startTime: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="end">End</Label>
            <Input id="end" type="time" value={draft.endTime} onChange={(e) => setDraft({ ...draft, endTime: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="tithi">Tithi</Label>
            <Input id="tithi" className="gu" value={draft.tithi ?? ""} onChange={(e) => setDraft({ ...draft, tithi: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="paksha">Paksha</Label>
            <Input id="paksha" className="gu" value={draft.paksha ?? ""} onChange={(e) => setDraft({ ...draft, paksha: e.target.value })} />
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label>Gujarati month</Label>
          <Select
            value={draft.gujaratiMonth ?? GUJARATI_MONTHS[0]}
            onValueChange={(v) => setDraft({ ...draft, gujaratiMonth: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GUJARATI_MONTHS.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1.5">
          <Label>Status</Label>
          <Select value={draft.status} onValueChange={(v) => setDraft({ ...draft, status: v as SevaStatus })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(STATUS_LABEL) as SevaStatus[]).map((s) => (
                <SelectItem key={s} value={s}>
                  {STATUS_LABEL[s].en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="desc">Description</Label>
          <Textarea id="desc" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="proc">Seva procedure</Label>
          <Textarea id="proc" value={draft.procedure} onChange={(e) => setDraft({ ...draft, procedure: e.target.value })} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="tags">Tags (comma)</Label>
          <Input
            id="tags"
            value={draft.tags.join(", ")}
            onChange={(e) =>
              setDraft({
                ...draft,
                tags: e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
              })
            }
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Reminders</p>
          <div className="flex flex-wrap gap-2">
            {REMINDER_PRESETS.map((m) => {
              const on = draft.reminderOffsets.includes(m);
              return (
                <Button
                  key={m}
                  type="button"
                  size="sm"
                  variant={on ? "default" : "outline"}
                  onClick={() =>
                    setDraft({
                      ...draft,
                      reminderOffsets: on
                        ? draft.reminderOffsets.filter((x) => x !== m)
                        : [...draft.reminderOffsets, m],
                    })
                  }
                >
                  {m} min
                </Button>
              );
            })}
          </div>
        </div>
        <label className="inline-flex h-11 w-fit cursor-pointer items-center rounded-lg border border-border px-4 text-sm">
          Attach photos or PDFs
          <input
            type="file"
            multiple
            className="sr-only"
            accept=".pdf,.jpg,.jpeg,.png,.webp,.gif"
            onChange={(e) => {
              const list = e.target.files ? Array.from(e.target.files) : [];
              const folder = draft.categoryId === "cat_manorath" ? "folder_manorath" : "folder_utsav";
              void ingest(list, folder, { eventId: draft.id }).then((created) => {
                const photos = created.filter((c) => c.kind === "image").map((c) => c.id);
                const pdfs = created.filter((c) => c.kind === "pdf").map((c) => c.id);
                setDraft((d) => ({
                  ...d,
                  photoIds: [...d.photoIds, ...photos],
                  pdfIds: [...d.pdfIds, ...pdfs],
                  attachmentIds: [...d.attachmentIds, ...created.map((c) => c.id)],
                }));
              });
              e.target.value = "";
            }}
          />
        </label>
        <ul className="text-sm">
          {draft.attachmentIds.map((id) => (
            <li key={id}>{files.find((f) => f.id === id)?.name ?? id}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => void save()}>{saved ? "Saved" : "Save"}</Button>
          <Button variant="outline" onClick={() => void duplicate(event.id)}>
            Duplicate
          </Button>
          <Button variant="destructive" onClick={() => void remove(event.id)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
