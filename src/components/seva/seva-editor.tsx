import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { REMINDER_PRESETS } from "@/lib/sdsp/constants";
import type { NityaSeva, RecurrenceKind } from "@/lib/sdsp/types";
import { SEVA_FOLDER } from "@/lib/sdsp/constants";
import { useSdsp } from "@/lib/storage/store";
import { isValidHHMM } from "@/lib/calendar/dates";

export function SevaEditor({ seva }: { seva: NityaSeva }) {
  const upsert = useSdsp((s) => s.upsertNitya);
  const ingest = useSdsp((s) => s.ingestFiles);
  const files = useSdsp((s) => s.files);
  const [draft, setDraft] = useState(seva);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    if (!isValidHHMM(draft.time)) return;
    await upsert({ ...draft, durationMin: Math.max(1, Number(draft.durationMin) || 1), updatedAt: new Date().toISOString() });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };

  const toggleReminder = (mins: number) => {
    const has = draft.reminderOffsets.includes(mins);
    setDraft({
      ...draft,
      reminderOffsets: has ? draft.reminderOffsets.filter((m) => m !== mins) : [...draft.reminderOffsets, mins].sort((a, b) => a - b),
    });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <p className="text-sm">
        <Link to="/seva" className="text-muted-foreground hover:text-foreground">
          Seva
        </Link>
        <span className="px-2 text-muted-foreground">/</span>
        <span className="gu">{draft.name}</span>
      </p>
      <h1 className="font-display text-3xl">Edit seva</h1>
      <div className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Seva name</Label>
          <Input id="name" className="gu" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="nameEn">English name</Label>
          <Input id="nameEn" value={draft.nameEn} onChange={(e) => setDraft({ ...draft, nameEn: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="time">Time</Label>
            <Input id="time" type="time" value={draft.time} onChange={(e) => setDraft({ ...draft, time: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="dur">Duration (min)</Label>
            <Input
              id="dur"
              type="number"
              min={1}
              value={draft.durationMin}
              onChange={(e) => setDraft({ ...draft, durationMin: Number(e.target.value) })}
            />
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label>Recurrence</Label>
          <Select
            value={draft.recurrence.kind}
            onValueChange={(v) => setDraft({ ...draft, recurrence: { kind: v as RecurrenceKind } })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(["daily", "weekly", "monthly", "yearly", "none"] as const).map((k) => (
                <SelectItem key={k} value={k}>
                  {k}
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
          <Label htmlFor="ins">Instructions</Label>
          <Textarea id="ins" value={draft.instructions} onChange={(e) => setDraft({ ...draft, instructions: e.target.value })} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Reminders</p>
          <div className="flex flex-wrap gap-2">
            {REMINDER_PRESETS.map((m) => (
              <Button key={m} type="button" size="sm" variant={draft.reminderOffsets.includes(m) ? "default" : "outline"} onClick={() => toggleReminder(m)}>
                {m < 60 ? `${m} min` : "1 hour"}
              </Button>
            ))}
          </div>
        </div>
        <label className="flex items-center justify-between gap-3 rounded-xl bg-secondary/50 px-4 py-3">
          <span className="text-sm">Enabled</span>
          <Switch checked={draft.enabled} onCheckedChange={(v) => setDraft({ ...draft, enabled: v })} />
        </label>
        <div>
          <p className="mb-2 text-sm font-medium">Attachments</p>
          <label className="inline-flex h-11 cursor-pointer items-center rounded-lg border border-border px-4 text-sm">
            Attach PDF or photo
            <input
              type="file"
              multiple
              className="sr-only"
              accept=".pdf,.jpg,.jpeg,.png,.webp,.gif"
              onChange={(e) => {
                const list = e.target.files ? Array.from(e.target.files) : [];
                const folder = SEVA_FOLDER[seva.id] ?? "folder_nitya";
                void ingest(list, folder, { sevaId: seva.id }).then((created) => {
                  setDraft((d) => ({ ...d, attachmentIds: [...d.attachmentIds, ...created.map((c) => c.id)] }));
                });
                e.target.value = "";
              }}
            />
          </label>
          <ul className="mt-2 space-y-1 text-sm">
            {draft.attachmentIds.map((id) => {
              const f = files.find((x) => x.id === id);
              return <li key={id}>{f?.name ?? id}</li>;
            })}
          </ul>
        </div>
        <Button onClick={() => void save()}>{saved ? "Saved" : "Save seva"}</Button>
      </div>
    </div>
  );
}
