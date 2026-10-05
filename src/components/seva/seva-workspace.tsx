import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Copy, Plus, Trash2 } from "lucide-react";
import { SevaIcon } from "@/components/seva/seva-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { formatMedium, formatTime } from "@/lib/calendar/dates";
import { useSdsp } from "@/lib/storage/store";

export function SevaWorkspace() {
  const nityaAll = useSdsp((s) => s.nitya);
  const eventsAll = useSdsp((s) => s.events);
  const categories = useSdsp((s) => s.categories);
  const addNitya = useSdsp((s) => s.addNitya);
  const duplicateNitya = useSdsp((s) => s.duplicateNitya);
  const removeNitya = useSdsp((s) => s.removeNitya);
  const reorderNitya = useSdsp((s) => s.reorderNitya);
  const addEvent = useSdsp((s) => s.addEvent);
  const addCategory = useSdsp((s) => s.addCategory);
  const [pending, setPending] = useState<string | null>(null);
  const [tab, setTab] = useState("nitya");
  const [catName, setCatName] = useState("");
  const nitya = useMemo(() => [...nityaAll].sort((a, b) => a.order - b.order), [nityaAll]);
  const events = useMemo(() => [...eventsAll].sort((a, b) => a.date.localeCompare(b.date)), [eventsAll]);

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold">Seva</h1>
          <p className="gu text-muted-foreground">નિત્ય અને વિશેષ સેવા</p>
        </div>
        {tab === "nitya" ? (
          <Button onClick={() => void addNitya()}>
            <Plus className="size-4" /> Add nitya seva
          </Button>
        ) : (
          <Button onClick={() => void addEvent()}>
            <Plus className="size-4" /> Add vishesh
          </Button>
        )}
      </header>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="nitya">Nitya Seva</TabsTrigger>
          <TabsTrigger value="vishesh">Vishesh Seva</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="nitya" className="space-y-3">
          {nitya.map((s, i) => (
            <div key={s.id} className="glass flex items-center gap-3 rounded-2xl p-3">
              <SevaIcon name={s.icon} className="size-12" />
              <Link to="/seva/$id" params={{ id: s.id }} className="min-w-0 flex-1">
                <p className="gu font-display text-lg">{s.name}</p>
                <p className="text-xs text-muted-foreground">
                  {s.nameEn} · {formatTime(s.time)} · {s.durationMin}m
                </p>
              </Link>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Move up"
                  disabled={i === 0}
                  onClick={() => {
                    const ids = nitya.map((x) => x.id);
                    [ids[i - 1], ids[i]] = [ids[i], ids[i - 1]];
                    void reorderNitya(ids);
                  }}
                >
                  ↑
                </Button>
                <Button variant="ghost" size="icon" aria-label="Duplicate" onClick={() => void duplicateNitya(s.id)}>
                  <Copy className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Remove" onClick={() => setPending(s.id)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="vishesh" className="space-y-3">
          {events.map((e) => {
            const cat = categories.find((c) => c.id === e.categoryId);
            return (
              <Link key={e.id} to="/event/$id" params={{ id: e.id }} className="glass block rounded-2xl p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{e.title}</p>
                    <p className="gu text-xs text-muted-foreground">
                      {cat?.name ?? "Vishesh"} · {formatMedium(e.date)}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{e.status}</span>
                </div>
              </Link>
            );
          })}
        </TabsContent>
        <TabsContent value="categories" className="space-y-3">
          {categories.map((c) => (
            <div key={c.id} className="glass flex items-center justify-between rounded-2xl p-4">
              <div>
                <p className="gu font-medium">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.nameEn}</p>
              </div>
              {c.system ? (
                <span className="text-xs text-muted-foreground">System</span>
              ) : (
                <span className="text-xs">Custom</span>
              )}
            </div>
          ))}
          <div className="flex gap-2">
            <Input
              placeholder="New vishesh category"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
            />
            <Button
              onClick={() => {
                if (!catName.trim()) return;
                void addCategory(catName.trim());
                setCatName("");
              }}
            >
              Add
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <AlertDialog open={Boolean(pending)} onOpenChange={(o) => !o && setPending(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this seva?</AlertDialogTitle>
            <AlertDialogDescription>You can undo from the toast immediately after.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pending) void removeNitya(pending);
                setPending(null);
              }}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
