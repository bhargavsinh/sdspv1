import { create } from "zustand";
import {
  DEFAULT_CATEGORIES,
  DEFAULT_EVENTS,
  DEFAULT_FOLDERS,
  DEFAULT_NITYA,
  SAMPLE_NOTE_ID,
} from "@/lib/sdsp/constants";
import { nid, logId } from "@/lib/sdsp/ids";
import {
  ALLOWED_EXT,
  ALLOWED_MIME,
  DEFAULT_SETTINGS,
  MAX_FILE_BYTES,
  type AppSettings,
  type DailySevaLog,
  type FileKind,
  type FolderNode,
  type NoteItem,
  type NityaSeva,
  type PanchangDay,
  type ProcedureItem,
  type RecentEntry,
  type SevaCategory,
  type SevaStatus,
  type StoredFileMeta,
  type VisheshEvent,
} from "@/lib/sdsp/types";
import { todayISO } from "@/lib/utils";
import {
  clearAllStores,
  deleteOne,
  estimateStorage,
  getAll,
  getBlob,
  isQuotaError,
  putBlob,
  putMany,
  putOne,
  type BlobRecord,
} from "./idb";

export type ToastFn = (message: string, opts?: { action?: { label: string; onClick: () => void } }) => void;

let toastFn: ToastFn = () => {};

export function bindToast(fn: ToastFn) {
  toastFn = fn;
}

function nowIso() {
  return new Date().toISOString();
}

function fileKind(mime: string, name: string): FileKind {
  if (mime === "application/pdf" || name.toLowerCase().endsWith(".pdf")) return "pdf";
  if (mime.startsWith("image/")) return "image";
  return "other";
}

function extOf(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

function validateFile(file: File): string | null {
  const ext = extOf(file.name);
  if (file.size > MAX_FILE_BYTES) return `"${file.name}" is larger than 25 MB.`;
  if (!ALLOWED_MIME.has(file.type) && !ALLOWED_EXT.has(ext)) {
    return `"${file.name}" is not a supported format. Use PDF, JPG, PNG, WEBP or GIF.`;
  }
  return null;
}

export interface SdspState {
  ready: boolean;
  error: string | null;
  online: boolean;
  settings: AppSettings;
  nitya: NityaSeva[];
  logs: Record<string, DailySevaLog>;
  events: VisheshEvent[];
  categories: SevaCategory[];
  folders: FolderNode[];
  files: StoredFileMeta[];
  notes: NoteItem[];
  procedures: ProcedureItem[];
  panchang: Record<string, PanchangDay>;
  recents: RecentEntry[];
  usage: number;
  quota: number;

  hydrate: () => Promise<void>;
  persistKv: () => Promise<void>;
  setOnline: (v: boolean) => void;
  patchSettings: (patch: Partial<AppSettings>) => Promise<void>;

  upsertNitya: (seva: NityaSeva) => Promise<void>;
  addNitya: (partial?: Partial<NityaSeva>) => Promise<NityaSeva>;
  duplicateNitya: (id: string) => Promise<NityaSeva | null>;
  removeNitya: (id: string) => Promise<void>;
  reorderNitya: (orderedIds: string[]) => Promise<void>;
  resetNityaDefaults: () => Promise<void>;

  setSevaStatus: (date: string, sevaId: string, status: SevaStatus, note?: string) => Promise<void>;
  clearSevaStatus: (date: string, sevaId: string) => Promise<void>;

  upsertEvent: (event: VisheshEvent) => Promise<void>;
  addEvent: (partial?: Partial<VisheshEvent>) => Promise<VisheshEvent>;
  duplicateEvent: (id: string) => Promise<VisheshEvent | null>;
  removeEvent: (id: string) => Promise<void>;

  addCategory: (name: string, nameEn?: string) => Promise<SevaCategory>;
  updateCategory: (id: string, patch: Partial<SevaCategory>) => Promise<void>;
  removeCategory: (id: string) => Promise<void>;

  addFolder: (parentId: string | null, name: string) => Promise<FolderNode>;
  renameFolder: (id: string, name: string) => Promise<void>;
  moveFolder: (id: string, parentId: string | null) => Promise<void>;
  archiveFolder: (id: string, archived: boolean) => Promise<void>;
  removeFolder: (id: string) => Promise<void>;

  ingestFiles: (list: File[], folderId: string, extra?: Partial<StoredFileMeta>) => Promise<StoredFileMeta[]>;
  renameFile: (id: string, name: string) => Promise<void>;
  moveFile: (id: string, folderId: string) => Promise<void>;
  copyFile: (id: string, folderId?: string) => Promise<StoredFileMeta | null>;
  archiveFile: (id: string, archived: boolean) => Promise<void>;
  toggleFavoriteFile: (id: string) => Promise<void>;
  removeFile: (id: string) => Promise<void>;
  readBlob: (id: string) => Promise<BlobRecord | undefined>;

  upsertNote: (note: NoteItem) => Promise<void>;
  addNote: (partial?: Partial<NoteItem>) => Promise<NoteItem>;
  removeNote: (id: string) => Promise<void>;

  upsertProcedure: (item: ProcedureItem) => Promise<void>;
  addProcedure: (partial?: Partial<ProcedureItem>) => Promise<ProcedureItem>;
  saveProcedureVersion: (id: string, body: string) => Promise<void>;
  removeProcedure: (id: string) => Promise<void>;

  upsertPanchang: (day: PanchangDay) => Promise<void>;
  clearPanchang: (date: string) => Promise<void>;

  touchRecent: (entry: Omit<RecentEntry, "id" | "openedAt">) => Promise<void>;

  replaceAll: (payload: Partial<Pick<SdspState, "settings" | "nitya" | "logs" | "events" | "categories" | "folders" | "files" | "notes" | "procedures" | "panchang" | "recents">>) => Promise<void>;
  wipeAll: () => Promise<void>;
  refreshQuota: () => Promise<void>;
}

const sampleNote: NoteItem = {
  id: SAMPLE_NOTE_ID,
  title: "Seva intention",
  body: "This planner stays on this device. Add your own pranalika, photographs, and panchang overrides. Religious documents are stored as uploaded — SDSP never rewrites them.",
  private: true,
  tags: ["personal"],
  favorite: true,
  archived: false,
  createdAt: nowIso(),
  updatedAt: nowIso(),
};

async function persistCollection<T extends { id: string }>(store: Parameters<typeof putMany>[0], items: T[]) {
  await putMany(store, items);
}

export const useSdsp = create<SdspState>((set, get) => ({
  ready: false,
  error: null,
  online: typeof navigator === "undefined" ? true : navigator.onLine,
  settings: DEFAULT_SETTINGS,
  nitya: DEFAULT_NITYA,
  logs: {},
  events: DEFAULT_EVENTS,
  categories: DEFAULT_CATEGORIES,
  folders: DEFAULT_FOLDERS,
  files: [],
  notes: [sampleNote],
  procedures: [],
  panchang: {},
  recents: [],
  usage: 0,
  quota: 0,

  hydrate: async () => {
    if (typeof indexedDB === "undefined") {
      set({ ready: true, error: "Local storage is unavailable. Changes will not persist." });
      return;
    }
    try {
      const [kv, nitya, logs, events, categories, folders, files, notes, procedures, panchang, recents] =
        await Promise.all([
          getAll<{ id: string; value: unknown }>("kv"),
          getAll<NityaSeva>("nitya"),
          getAll<DailySevaLog>("logs"),
          getAll<VisheshEvent>("events"),
          getAll<SevaCategory>("categories"),
          getAll<FolderNode>("folders"),
          getAll<StoredFileMeta>("files"),
          getAll<NoteItem>("notes"),
          getAll<ProcedureItem>("procedures"),
          getAll<PanchangDay>("panchang"),
          getAll<RecentEntry>("recents"),
        ]);

      const settingsRow = kv.find((k) => k.id === "settings");
      const seeded = kv.find((k) => k.id === "seeded");
      const settings = {
        ...DEFAULT_SETTINGS,
        ...((settingsRow?.value as AppSettings) ?? {}),
      };

      if (!seeded) {
        await persistCollection("nitya", DEFAULT_NITYA);
        await persistCollection("events", DEFAULT_EVENTS);
        await persistCollection("categories", DEFAULT_CATEGORIES);
        await persistCollection("folders", DEFAULT_FOLDERS);
        await persistCollection("notes", [sampleNote]);
        await putOne("kv", { id: "seeded", value: true });
        await putOne("kv", { id: "settings", value: settings });
        set({
          ready: true,
          settings,
          nitya: DEFAULT_NITYA,
          events: DEFAULT_EVENTS,
          categories: DEFAULT_CATEGORIES,
          folders: DEFAULT_FOLDERS,
          notes: [sampleNote],
          logs: {},
          files: [],
          procedures: [],
          panchang: {},
          recents: [],
          error: null,
        });
      } else {
        const logMap: Record<string, DailySevaLog> = {};
        for (const log of logs) logMap[log.id] = log;
        const panMap: Record<string, PanchangDay> = {};
        for (const p of panchang) panMap[p.date] = p;
        set({
          ready: true,
          settings,
          nitya: nitya.length ? nitya.sort((a, b) => a.order - b.order) : DEFAULT_NITYA,
          logs: logMap,
          events: events.length ? events : DEFAULT_EVENTS,
          categories: categories.length ? categories : DEFAULT_CATEGORIES,
          folders: folders.length ? folders : DEFAULT_FOLDERS,
          files,
          notes,
          procedures,
          panchang: panMap,
          recents: recents.sort((a, b) => b.openedAt.localeCompare(a.openedAt)).slice(0, 40),
          error: null,
        });
      }
      await get().refreshQuota();
    } catch (err) {
      console.error(err);
      set({
        ready: true,
        error: err instanceof Error ? err.message : "Could not load local data.",
      });
    }
  },

  persistKv: async () => {
    try {
      await putOne("kv", { id: "settings", value: get().settings });
    } catch (err) {
      toastFn(isQuotaError(err) ? "Storage is full. Export a backup and free space." : "Could not save settings.");
    }
  },

  setOnline: (v) => set({ online: v }),

  patchSettings: async (patch) => {
    const settings = { ...get().settings, ...patch };
    set({ settings });
    await get().persistKv();
  },

  upsertNitya: async (seva) => {
    const next = get().nitya.some((s) => s.id === seva.id)
      ? get().nitya.map((s) => (s.id === seva.id ? seva : s))
      : [...get().nitya, seva];
    set({ nitya: next.sort((a, b) => a.order - b.order) });
    await putOne("nitya", seva);
  },

  addNitya: async (partial = {}) => {
    const order = get().nitya.reduce((m, s) => Math.max(m, s.order), -1) + 1;
    const seva: NityaSeva = {
      id: nid("seva"),
      name: "નવી સેવા",
      nameEn: "New Seva",
      order,
      time: "08:00",
      durationMin: 30,
      description: "",
      instructions: "",
      notes: "",
      categoryId: "cat_nitya",
      reminderOffsets: [get().settings.defaultReminder],
      recurrence: { kind: "daily" },
      attachmentIds: [],
      icon: "custom",
      enabled: true,
      createdAt: nowIso(),
      updatedAt: nowIso(),
      ...partial,
    };
    await get().upsertNitya(seva);
    return seva;
  },

  duplicateNitya: async (id) => {
    const src = get().nitya.find((s) => s.id === id);
    if (!src) return null;
    return get().addNitya({
      ...src,
      id: nid("seva"),
      name: `${src.name} (copy)`,
      nameEn: `${src.nameEn} (copy)`,
      order: src.order + 0.5,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    });
  },

  removeNitya: async (id) => {
    const prev = get().nitya;
    set({ nitya: prev.filter((s) => s.id !== id) });
    await deleteOne("nitya", id);
    toastFn("Seva removed", {
      action: {
        label: "Undo",
        onClick: () => {
          const found = prev.find((s) => s.id === id);
          if (found) void get().upsertNitya(found);
        },
      },
    });
  },

  reorderNitya: async (orderedIds) => {
    const map = new Map(get().nitya.map((s) => [s.id, s]));
    const next = orderedIds
      .map((id, i) => {
        const s = map.get(id);
        return s ? { ...s, order: i, updatedAt: nowIso() } : null;
      })
      .filter((s): s is NityaSeva => Boolean(s));
    set({ nitya: next });
    await persistCollection("nitya", next);
  },

  resetNityaDefaults: async () => {
    set({ nitya: DEFAULT_NITYA });
    await persistCollection("nitya", DEFAULT_NITYA);
  },

  setSevaStatus: async (date, sevaId, status, note) => {
    const id = logId(date, sevaId);
    const prev = get().logs[id];
    const log: DailySevaLog = {
      id,
      date,
      sevaId,
      status,
      note,
      completedAt: status === "completed" ? nowIso() : prev?.completedAt,
      updatedAt: nowIso(),
    };
    set({ logs: { ...get().logs, [id]: log } });
    await putOne("logs", log);
  },

  clearSevaStatus: async (date, sevaId) => {
    const id = logId(date, sevaId);
    const copy = { ...get().logs };
    delete copy[id];
    set({ logs: copy });
    await deleteOne("logs", id);
  },

  upsertEvent: async (event) => {
    const events = get().events.some((e) => e.id === event.id)
      ? get().events.map((e) => (e.id === event.id ? event : e))
      : [...get().events, event];
    set({ events });
    await putOne("events", event);
  },

  addEvent: async (partial = {}) => {
    const event: VisheshEvent = {
      id: nid("evt"),
      title: "નવો વિશેષ સેવા",
      categoryId: "cat_utsav",
      date: todayISO(),
      startTime: "08:00",
      endTime: "10:00",
      description: "",
      procedure: "",
      notes: "",
      photoIds: [],
      pdfIds: [],
      attachmentIds: [],
      reminderOffsets: [get().settings.defaultReminder],
      status: "upcoming",
      tags: [],
      favorite: false,
      createdAt: nowIso(),
      updatedAt: nowIso(),
      ...partial,
    };
    await get().upsertEvent(event);
    return event;
  },

  duplicateEvent: async (id) => {
    const src = get().events.find((e) => e.id === id);
    if (!src) return null;
    return get().addEvent({
      ...src,
      id: nid("evt"),
      title: `${src.title} (copy)`,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    });
  },

  removeEvent: async (id) => {
    const prev = get().events.find((e) => e.id === id);
    set({ events: get().events.filter((e) => e.id !== id) });
    await deleteOne("events", id);
    if (prev) {
      toastFn("Event removed", {
        action: { label: "Undo", onClick: () => void get().upsertEvent(prev) },
      });
    }
  },

  addCategory: async (name, nameEn) => {
    const cat: SevaCategory = {
      id: nid("cat"),
      name,
      nameEn: nameEn || name,
      kind: "custom",
      system: false,
      order: get().categories.length,
    };
    set({ categories: [...get().categories, cat] });
    await putOne("categories", cat);
    return cat;
  },

  updateCategory: async (id, patch) => {
    const categories = get().categories.map((c) => (c.id === id ? { ...c, ...patch } : c));
    set({ categories });
    const found = categories.find((c) => c.id === id);
    if (found) await putOne("categories", found);
  },

  removeCategory: async (id) => {
    const cat = get().categories.find((c) => c.id === id);
    if (!cat || cat.system) return;
    set({ categories: get().categories.filter((c) => c.id !== id) });
    await deleteOne("categories", id);
  },

  addFolder: async (parentId, name) => {
    const folder: FolderNode = {
      id: nid("folder"),
      parentId,
      name: name.trim() || "New folder",
      system: false,
      archived: false,
      createdAt: nowIso(),
    };
    set({ folders: [...get().folders, folder] });
    await putOne("folders", folder);
    return folder;
  },

  renameFolder: async (id, name) => {
    const folders = get().folders.map((f) => (f.id === id ? { ...f, name } : f));
    set({ folders });
    const found = folders.find((f) => f.id === id);
    if (found) await putOne("folders", found);
  },

  moveFolder: async (id, parentId) => {
    if (id === parentId) return;
    const folders = get().folders.map((f) => (f.id === id ? { ...f, parentId } : f));
    set({ folders });
    const found = folders.find((f) => f.id === id);
    if (found) await putOne("folders", found);
  },

  archiveFolder: async (id, archived) => {
    const folders = get().folders.map((f) => (f.id === id ? { ...f, archived } : f));
    set({ folders });
    const found = folders.find((f) => f.id === id);
    if (found) await putOne("folders", found);
  },

  removeFolder: async (id) => {
    const folder = get().folders.find((f) => f.id === id);
    if (!folder || folder.system) {
      toastFn("System folders cannot be deleted. Archive instead.");
      return;
    }
    const hasChildren = get().folders.some((f) => f.parentId === id);
    const hasFiles = get().files.some((f) => f.folderId === id);
    if (hasChildren || hasFiles) {
      toastFn("Move or delete contents before removing this folder.");
      return;
    }
    set({ folders: get().folders.filter((f) => f.id !== id) });
    await deleteOne("folders", id);
  },

  ingestFiles: async (list, folderId, extra = {}) => {
    const created: StoredFileMeta[] = [];
    for (const file of list) {
      const err = validateFile(file);
      if (err) {
        toastFn(err);
        continue;
      }
      const id = nid("file");
      const meta: StoredFileMeta = {
        id,
        folderId,
        name: file.name,
        mime: file.type || (extOf(file.name) === "pdf" ? "application/pdf" : "application/octet-stream"),
        size: file.size,
        kind: fileKind(file.type, file.name),
        createdAt: nowIso(),
        updatedAt: nowIso(),
        favorite: false,
        archived: false,
        tags: [],
        ...extra,
      };
      try {
        await putBlob({ id, blob: file, mime: meta.mime, name: meta.name });
        await putOne("files", meta);
        created.push(meta);
      } catch (e) {
        toastFn(isQuotaError(e) ? "Storage limit reached. Remove files or export a backup." : "Could not save that file.");
      }
    }
    if (created.length) set({ files: [...get().files, ...created] });
    await get().refreshQuota();
    return created;
  },

  renameFile: async (id, name) => {
    const files = get().files.map((f) => (f.id === id ? { ...f, name, updatedAt: nowIso() } : f));
    set({ files });
    const found = files.find((f) => f.id === id);
    if (found) await putOne("files", found);
  },

  moveFile: async (id, folderId) => {
    const files = get().files.map((f) => (f.id === id ? { ...f, folderId, updatedAt: nowIso() } : f));
    set({ files });
    const found = files.find((f) => f.id === id);
    if (found) await putOne("files", found);
  },

  copyFile: async (id, folderId) => {
    const src = get().files.find((f) => f.id === id);
    const blob = await getBlob(id);
    if (!src || !blob) return null;
    const copyId = nid("file");
    const meta: StoredFileMeta = {
      ...src,
      id: copyId,
      folderId: folderId ?? src.folderId,
      name: src.name.replace(/(\.[^.]+)?$/, (m) => ` copy${m}`),
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    try {
      await putBlob({ id: copyId, blob: blob.blob, mime: src.mime, name: meta.name });
      await putOne("files", meta);
      set({ files: [...get().files, meta] });
      return meta;
    } catch (e) {
      toastFn(isQuotaError(e) ? "Storage limit reached." : "Could not copy file.");
      return null;
    }
  },

  archiveFile: async (id, archived) => {
    const archiveId = "folder_archive";
    const files = get().files.map((f) =>
      f.id === id
        ? { ...f, archived, folderId: archived ? archiveId : f.folderId === archiveId ? "folder_root" : f.folderId, updatedAt: nowIso() }
        : f,
    );
    set({ files });
    const found = files.find((f) => f.id === id);
    if (found) await putOne("files", found);
  },

  toggleFavoriteFile: async (id) => {
    const files = get().files.map((f) => (f.id === id ? { ...f, favorite: !f.favorite, updatedAt: nowIso() } : f));
    set({ files });
    const found = files.find((f) => f.id === id);
    if (found) await putOne("files", found);
  },

  removeFile: async (id) => {
    const prev = get().files.find((f) => f.id === id);
    set({ files: get().files.filter((f) => f.id !== id) });
    await deleteOne("files", id);
    await deleteOne("blobs", id);
    await get().refreshQuota();
    toastFn("File deleted", {
      action: {
        label: "Cannot undo binary",
        onClick: () => undefined,
      },
    });
    void prev;
  },

  readBlob: async (id) => getBlob(id),

  upsertNote: async (note) => {
    const notes = get().notes.some((n) => n.id === note.id)
      ? get().notes.map((n) => (n.id === note.id ? note : n))
      : [...get().notes, note];
    set({ notes });
    await putOne("notes", note);
  },

  addNote: async (partial = {}) => {
    const note: NoteItem = {
      id: nid("note"),
      title: "નોંધ",
      body: "",
      private: true,
      tags: [],
      favorite: false,
      archived: false,
      createdAt: nowIso(),
      updatedAt: nowIso(),
      ...partial,
    };
    await get().upsertNote(note);
    return note;
  },

  removeNote: async (id) => {
    const prev = get().notes.find((n) => n.id === id);
    set({ notes: get().notes.filter((n) => n.id !== id) });
    await deleteOne("notes", id);
    if (prev) {
      toastFn("Note removed", {
        action: { label: "Undo", onClick: () => void get().upsertNote(prev) },
      });
    }
  },

  upsertProcedure: async (item) => {
    const procedures = get().procedures.some((p) => p.id === item.id)
      ? get().procedures.map((p) => (p.id === item.id ? item : p))
      : [...get().procedures, item];
    set({ procedures });
    await putOne("procedures", item);
  },

  addProcedure: async (partial = {}) => {
    const item: ProcedureItem = {
      id: nid("proc"),
      title: "સેવા પ્રણાલિકા",
      body: "",
      version: 1,
      versions: [{ version: 1, body: "", createdAt: nowIso() }],
      sevaIds: [],
      tags: [],
      bookmarked: false,
      fileIds: [],
      notes: "",
      archived: false,
      createdAt: nowIso(),
      updatedAt: nowIso(),
      ...partial,
    };
    await get().upsertProcedure(item);
    return item;
  },

  saveProcedureVersion: async (id, body) => {
    const src = get().procedures.find((p) => p.id === id);
    if (!src) return;
    const version = src.version + 1;
    const next: ProcedureItem = {
      ...src,
      body,
      version,
      versions: [...src.versions, { version, body, createdAt: nowIso() }],
      updatedAt: nowIso(),
    };
    await get().upsertProcedure(next);
  },

  removeProcedure: async (id) => {
    const prev = get().procedures.find((p) => p.id === id);
    set({ procedures: get().procedures.filter((p) => p.id !== id) });
    await deleteOne("procedures", id);
    if (prev) {
      toastFn("Procedure removed", {
        action: { label: "Undo", onClick: () => void get().upsertProcedure(prev) },
      });
    }
  },

  upsertPanchang: async (day) => {
    set({ panchang: { ...get().panchang, [day.date]: day } });
    await putOne("panchang", { ...day, id: day.date });
  },

  clearPanchang: async (date) => {
    const copy = { ...get().panchang };
    delete copy[date];
    set({ panchang: copy });
    await deleteOne("panchang", date);
  },

  touchRecent: async (entry) => {
    const rec: RecentEntry = { ...entry, id: nid("recent"), openedAt: nowIso() };
    const recents = [rec, ...get().recents.filter((r) => !(r.kind === entry.kind && r.refId === entry.refId))].slice(0, 40);
    set({ recents });
    await putOne("recents", rec);
  },

  replaceAll: async (payload) => {
    if (payload.settings) set({ settings: payload.settings });
    if (payload.nitya) set({ nitya: payload.nitya });
    if (payload.logs) set({ logs: payload.logs });
    if (payload.events) set({ events: payload.events });
    if (payload.categories) set({ categories: payload.categories });
    if (payload.folders) set({ folders: payload.folders });
    if (payload.files) set({ files: payload.files });
    if (payload.notes) set({ notes: payload.notes });
    if (payload.procedures) set({ procedures: payload.procedures });
    if (payload.panchang) set({ panchang: payload.panchang });
    if (payload.recents) set({ recents: payload.recents });
    const s = get();
    await persistCollection("nitya", s.nitya);
    await persistCollection("events", s.events);
    await persistCollection("categories", s.categories);
    await persistCollection("folders", s.folders);
    await persistCollection("files", s.files);
    await persistCollection("notes", s.notes);
    await persistCollection("procedures", s.procedures);
    await persistCollection("recents", s.recents);
    await persistCollection("panchang", Object.values(s.panchang).map((p) => ({ ...p, id: p.date })));
    await persistCollection("logs", Object.values(s.logs));
    await putOne("kv", { id: "settings", value: s.settings });
    await putOne("kv", { id: "seeded", value: true });
  },

  wipeAll: async () => {
    await clearAllStores();
    set({
      settings: DEFAULT_SETTINGS,
      nitya: DEFAULT_NITYA,
      logs: {},
      events: DEFAULT_EVENTS,
      categories: DEFAULT_CATEGORIES,
      folders: DEFAULT_FOLDERS,
      files: [],
      notes: [sampleNote],
      procedures: [],
      panchang: {},
      recents: [],
    });
    await persistCollection("nitya", DEFAULT_NITYA);
    await persistCollection("events", DEFAULT_EVENTS);
    await persistCollection("categories", DEFAULT_CATEGORIES);
    await persistCollection("folders", DEFAULT_FOLDERS);
    await persistCollection("notes", [sampleNote]);
    await putOne("kv", { id: "seeded", value: true });
    await putOne("kv", { id: "settings", value: DEFAULT_SETTINGS });
  },

  refreshQuota: async () => {
    const { usage, quota } = await estimateStorage();
    set({ usage, quota });
  },
}));

export function sevaStatusFor(logs: Record<string, DailySevaLog>, date: string, sevaId: string): SevaStatus {
  return logs[logId(date, sevaId)]?.status ?? "upcoming";
}
