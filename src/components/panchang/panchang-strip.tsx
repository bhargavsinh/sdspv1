import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GUJARATI_MONTHS, TITHIS } from "@/lib/sdsp/constants";
import { formatVs, resolvePanchang, weekdayGu } from "@/lib/panchang/panchang";
import { useSdsp } from "@/lib/storage/store";
import { formatLong } from "@/lib/calendar/dates";
import type { PanchangDay } from "@/lib/sdsp/types";

export function PanchangStrip({ date }: { date: string }) {
  const settings = useSdsp((s) => s.settings);
  const overrides = useSdsp((s) => s.panchang);
  const upsert = useSdsp((s) => s.upsertPanchang);
  const clear = useSdsp((s) => s.clearPanchang);
  const p = resolvePanchang(date, overrides, settings.vsNewYearMd);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<PanchangDay>(p);

  const openEditor = () => {
    setDraft(p);
    setOpen(true);
  };

  return (
    <>
      <section className="glass rounded-2xl p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs tracking-widest text-muted-foreground uppercase">Panchang</p>
            <h2 className="font-display mt-1 text-2xl font-semibold">{formatLong(date)}</h2>
            <p className="gu mt-1 text-sm text-muted-foreground">{weekdayGu(date)}</p>
          </div>
          <Button variant="outline" size="sm" onClick={openEditor}>
            <Pencil className="size-3.5" /> Override
          </Button>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl bg-secondary/60 p-3">
            <dt className="text-[11px] tracking-wide text-muted-foreground uppercase">Vikram Samvat</dt>
            <dd className="gu mt-1 text-lg font-medium">{formatVs(p.vsYear)}</dd>
          </div>
          <div className="rounded-xl bg-secondary/60 p-3">
            <dt className="text-[11px] tracking-wide text-muted-foreground uppercase">Gujarati month</dt>
            <dd className="gu mt-1 text-lg font-medium">{p.gujaratiMonth}</dd>
          </div>
          <div className="rounded-xl bg-secondary/60 p-3">
            <dt className="text-[11px] tracking-wide text-muted-foreground uppercase">Tithi</dt>
            <dd className="gu mt-1 text-lg font-medium">{p.tithi}</dd>
          </div>
          <div className="rounded-xl bg-secondary/60 p-3">
            <dt className="text-[11px] tracking-wide text-muted-foreground uppercase">Paksha</dt>
            <dd className="gu mt-1 text-lg font-medium">{p.paksha}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-muted-foreground">
          {p.manual
            ? "Manual override — SDSP will not replace this with an estimate."
            : "Estimated from your Vikram Samvat new-year setting. Tap Override to enter your panchang."}
        </p>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit panchang</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="vs">Vikram Samvat year</Label>
              <Input
                id="vs"
                type="number"
                value={draft.vsYear}
                onChange={(e) => setDraft({ ...draft, vsYear: Number(e.target.value) || draft.vsYear })}
              />
            </div>
            <div className="grid gap-1.5">
              <Label>Gujarati month</Label>
              <Select value={draft.gujaratiMonth} onValueChange={(v) => setDraft({ ...draft, gujaratiMonth: v })}>
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
              <Label>Tithi</Label>
              <Select value={draft.tithi} onValueChange={(v) => setDraft({ ...draft, tithi: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[...TITHIS, "પૂનમ", "અમાસ"].map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label>Paksha</Label>
              <Select value={draft.paksha} onValueChange={(v) => setDraft({ ...draft, paksha: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="શુક્લ પક્ષ">શુક્લ પક્ષ</SelectItem>
                  <SelectItem value="કૃષ્ણ પક્ષ">કૃષ્ણ પક્ષ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="pnotes">Notes</Label>
              <Input
                id="pnotes"
                value={draft.notes ?? ""}
                onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                void clear(date);
                setOpen(false);
              }}
            >
              Use estimate
            </Button>
            <Button
              onClick={() => {
                const year = Number(draft.vsYear);
                if (!Number.isFinite(year) || year < 2000 || year > 2200) return;
                void upsert({ ...draft, date, manual: true, vsYear: year });
                setOpen(false);
              }}
            >
              Save override
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
