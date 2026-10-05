import { getAll, getBlob, putBlob } from "@/lib/storage/idb";
import { useSdsp } from "@/lib/storage/store";
import type {
  AppSettings,
  DailySevaLog,
  FolderNode,
  NoteItem,
  NityaSeva,
  PanchangDay,
  ProcedureItem,
  RecentEntry,
  SevaCategory,
  StoredFileMeta,
  VisheshEvent,
} from "@/lib/sdsp/types";

export interface SdspBackup {
  app: "SDSP";
  version: 1;
  exportedAt: string;
  includeFiles: boolean;
  settings: AppSettings;
  nitya: NityaSeva[];
  logs: DailySevaLog[];
  events: VisheshEvent[];
  categories: SevaCategory[];
  folders: FolderNode[];
  files: StoredFileMeta[];
  notes: NoteItem[];
  procedures: ProcedureItem[];
  panchang: PanchangDay[];
  recents: RecentEntry[];
  blobs?: { id: string; mime: string; name: string; data: string }[];
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? "");
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(reader.error ?? new Error("Could not read file."));
    reader.readAsDataURL(blob);
  });
}

function base64ToBlob(data: string, mime: string): Blob {
  const bin = atob(data);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: mime || "application/octet-stream" });
}

export async function exportBackup(includeFiles: boolean): Promise<SdspBackup> {
  const s = useSdsp.getState();
  const backup: SdspBackup = {
    app: "SDSP",
    version: 1,
    exportedAt: new Date().toISOString(),
    includeFiles,
    settings: s.settings,
    nitya: s.nitya,
    logs: Object.values(s.logs),
    events: s.events,
    categories: s.categories,
    folders: s.folders,
    files: s.files,
    notes: s.notes,
    procedures: s.procedures,
    panchang: Object.values(s.panchang),
    recents: s.recents,
  };
  if (includeFiles) {
    backup.blobs = [];
    for (const file of s.files) {
      const rec = await getBlob(file.id);
      if (!rec) continue;
      backup.blobs.push({
        id: rec.id,
        mime: rec.mime,
        name: rec.name,
        data: await blobToBase64(rec.blob),
      });
    }
  }
  return backup;
}

export function downloadBackup(backup: SdspBackup) {
  const blob = new Blob([JSON.stringify(backup)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `sdsp-backup-${backup.exportedAt.slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseBackup(raw: unknown): SdspBackup {
  if (!raw || typeof raw !== "object") throw new Error("Backup file is empty or unreadable.");
  const data = raw as Partial<SdspBackup>;
  if (data.app !== "SDSP") throw new Error("This file is not an SDSP backup.");
  if (data.version !== 1) throw new Error("Unsupported backup version.");
  if (!data.settings || !Array.isArray(data.nitya)) throw new Error("Backup is missing required seva data.");
  return data as SdspBackup;
}

export async function restoreBackup(backup: SdspBackup) {
  const logs: Record<string, DailySevaLog> = {};
  for (const log of backup.logs ?? []) logs[log.id] = log;
  const panchang: Record<string, PanchangDay> = {};
  for (const p of backup.panchang ?? []) panchang[p.date] = p;

  await useSdsp.getState().replaceAll({
    settings: backup.settings,
    nitya: backup.nitya ?? [],
    logs,
    events: backup.events ?? [],
    categories: backup.categories ?? [],
    folders: backup.folders ?? [],
    files: backup.files ?? [],
    notes: backup.notes ?? [],
    procedures: backup.procedures ?? [],
    panchang,
    recents: backup.recents ?? [],
  });

  if (backup.includeFiles && backup.blobs?.length) {
    for (const b of backup.blobs) {
      try {
        await putBlob({ id: b.id, mime: b.mime, name: b.name, blob: base64ToBlob(b.data, b.mime) });
      } catch (err) {
        console.error("blob restore failed", err);
      }
    }
  }
}

export async function exportMetadataOnly() {
  return exportBackup(false);
}

export async function dumpForDiagnostics() {
  return {
    files: await getAll("files"),
    folders: await getAll("folders"),
  };
}
