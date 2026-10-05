import type { SdspState } from "@/lib/storage/store";
import { formatMedium } from "@/lib/calendar/dates";

export type SearchKind = "seva" | "event" | "note" | "file" | "folder" | "procedure" | "panchang" | "tag";

export type Searchable = Pick<
  SdspState,
  "nitya" | "events" | "notes" | "files" | "folders" | "procedures" | "categories" | "panchang"
>;

export interface SearchHit {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle: string;
  href: string;
  tags: string[];
  date?: string;
  favorite?: boolean;
  status?: string;
  mime?: string;
}

export interface SearchFilters {
  kinds?: SearchKind[];
  dateFrom?: string;
  dateTo?: string;
  categoryId?: string;
  folderId?: string;
  status?: string;
  favorite?: boolean;
  fileKind?: "pdf" | "image" | "other";
}

function hay(...parts: Array<string | undefined | null>) {
  return parts.filter(Boolean).join(" ").toLowerCase();
}

export function searchSdsp(state: Searchable, query: string, filters: SearchFilters = {}): SearchHit[] {
  const q = query.trim().toLowerCase();
  const hits: SearchHit[] = [];
  const allow = (kind: SearchKind) => !filters.kinds?.length || filters.kinds.includes(kind);

  const inRange = (date?: string) => {
    if (!date) return true;
    if (filters.dateFrom && date < filters.dateFrom) return false;
    if (filters.dateTo && date > filters.dateTo) return false;
    return true;
  };

  if (allow("seva")) {
    for (const s of state.nitya) {
      if (q && !hay(s.name, s.nameEn, s.description, s.instructions, s.notes, s.time).includes(q)) continue;
      hits.push({
        id: s.id,
        kind: "seva",
        title: s.name,
        subtitle: `${s.nameEn} · ${s.time}`,
        href: `/seva/${s.id}`,
        tags: ["nitya"],
      });
    }
  }

  if (allow("event")) {
    for (const e of state.events) {
      if (filters.categoryId && e.categoryId !== filters.categoryId) continue;
      if (filters.status && e.status !== filters.status) continue;
      if (filters.favorite && !e.favorite) continue;
      if (!inRange(e.date)) continue;
      if (q && !hay(e.title, e.description, e.procedure, e.notes, e.tithi, e.gujaratiMonth, ...e.tags).includes(q)) {
        continue;
      }
      const cat = state.categories.find((c) => c.id === e.categoryId);
      hits.push({
        id: e.id,
        kind: "event",
        title: e.title,
        subtitle: `${cat?.nameEn ?? "Vishesh"} · ${formatMedium(e.date)}`,
        href: `/event/${e.id}`,
        tags: e.tags,
        date: e.date,
        favorite: e.favorite,
        status: e.status,
      });
    }
  }

  if (allow("note")) {
    for (const n of state.notes) {
      if (n.archived) continue;
      if (filters.favorite && !n.favorite) continue;
      if (q && !hay(n.title, n.body, ...n.tags).includes(q)) continue;
      hits.push({
        id: n.id,
        kind: "note",
        title: n.title,
        subtitle: n.private ? "Private note" : "Note",
        href: `/notes?id=${n.id}`,
        tags: n.tags,
        favorite: n.favorite,
      });
    }
  }

  if (allow("file")) {
    for (const f of state.files) {
      if (filters.folderId && f.folderId !== filters.folderId) continue;
      if (filters.favorite && !f.favorite) continue;
      if (filters.fileKind && f.kind !== filters.fileKind) continue;
      if (q && !hay(f.name, f.mime, ...f.tags).includes(q)) continue;
      hits.push({
        id: f.id,
        kind: "file",
        title: f.name,
        subtitle: f.kind.toUpperCase(),
        href: `/files?file=${f.id}`,
        tags: f.tags,
        favorite: f.favorite,
        mime: f.mime,
      });
    }
  }

  if (allow("folder")) {
    for (const folder of state.folders) {
      if (folder.archived) continue;
      if (q && !hay(folder.name).includes(q)) continue;
      hits.push({
        id: folder.id,
        kind: "folder",
        title: folder.name,
        subtitle: "Folder",
        href: `/files?folder=${folder.id}`,
        tags: [],
      });
    }
  }

  if (allow("procedure")) {
    for (const p of state.procedures) {
      if (p.archived) continue;
      if (filters.favorite && !p.bookmarked) continue;
      if (q && !hay(p.title, p.body, p.notes, ...p.tags).includes(q)) continue;
      hits.push({
        id: p.id,
        kind: "procedure",
        title: p.title,
        subtitle: `Pranalika v${p.version}`,
        href: `/pranalika?id=${p.id}`,
        tags: p.tags,
        favorite: p.bookmarked,
      });
    }
  }

  if (allow("panchang") && q) {
    for (const p of Object.values(state.panchang)) {
      if (!hay(p.date, String(p.vsYear), p.gujaratiMonth, p.tithi, p.paksha, p.notes).includes(q)) continue;
      if (!inRange(p.date)) continue;
      hits.push({
        id: p.date,
        kind: "panchang",
        title: p.date,
        subtitle: `વિ.સં. ${p.vsYear} · ${p.gujaratiMonth} · ${p.tithi}`,
        href: `/calendar/${p.date}`,
        tags: ["panchang"],
        date: p.date,
      });
    }
  }

  if (allow("tag") && q) {
    const tags = new Set<string>();
    for (const e of state.events) e.tags.forEach((t) => tags.add(t));
    for (const n of state.notes) n.tags.forEach((t) => tags.add(t));
    for (const f of state.files) f.tags.forEach((t) => tags.add(t));
    for (const p of state.procedures) p.tags.forEach((t) => tags.add(t));
    for (const t of tags) {
      if (!t.toLowerCase().includes(q)) continue;
      hits.push({
        id: `tag_${t}`,
        kind: "tag",
        title: `#${t}`,
        subtitle: "Tag",
        href: `/search?q=${encodeURIComponent(t)}`,
        tags: [t],
      });
    }
  }

  return hits.slice(0, 80);
}
