const DB_NAME = "sdsp-db";
const DB_VERSION = 1;

export const STORES = [
  "kv",
  "nitya",
  "logs",
  "events",
  "categories",
  "folders",
  "files",
  "blobs",
  "notes",
  "panchang",
  "procedures",
  "recents",
] as const;

export type StoreName = (typeof STORES)[number];

let dbPromise: Promise<IDBDatabase> | null = null;

function available() {
  return typeof indexedDB !== "undefined";
}

export function openDb(): Promise<IDBDatabase> {
  if (!available()) {
    return Promise.reject(new Error("IndexedDB is not available in this environment."));
  }
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      for (const name of STORES) {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name, { keyPath: "id" });
        }
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => {
      dbPromise = null;
      reject(req.error ?? new Error("Failed to open SDSP storage."));
    };
  });
  return dbPromise;
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("Storage transaction failed."));
    tx.onabort = () => reject(tx.error ?? new Error("Storage transaction aborted."));
  });
}

export async function getAll<T>(store: StoreName): Promise<T[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = db.transaction(store, "readonly").objectStore(store).getAll();
    req.onsuccess = () => resolve((req.result as T[]) ?? []);
    req.onerror = () => reject(req.error);
  });
}

export async function getById<T>(store: StoreName, id: string): Promise<T | undefined> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = db.transaction(store, "readonly").objectStore(store).get(id);
    req.onsuccess = () => resolve(req.result as T | undefined);
    req.onerror = () => reject(req.error);
  });
}

export async function putOne<T extends { id: string }>(store: StoreName, value: T): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(store, "readwrite");
  tx.objectStore(store).put(value);
  await txDone(tx);
}

export async function putMany<T extends { id: string }>(store: StoreName, values: T[]): Promise<void> {
  if (!values.length) return;
  const db = await openDb();
  const tx = db.transaction(store, "readwrite");
  const os = tx.objectStore(store);
  for (const v of values) os.put(v);
  await txDone(tx);
}

export async function deleteOne(store: StoreName, id: string): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(store, "readwrite");
  tx.objectStore(store).delete(id);
  await txDone(tx);
}

export async function clearStore(store: StoreName): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(store, "readwrite");
  tx.objectStore(store).clear();
  await txDone(tx);
}

export async function clearAllStores(): Promise<void> {
  const db = await openDb();
  const tx = db.transaction([...STORES], "readwrite");
  for (const name of STORES) tx.objectStore(name).clear();
  await txDone(tx);
}

export type BlobRecord = { id: string; blob: Blob; mime: string; name: string };

export async function putBlob(record: BlobRecord): Promise<void> {
  await putOne("blobs", record);
}

export async function getBlob(id: string): Promise<BlobRecord | undefined> {
  return getById<BlobRecord>("blobs", id);
}

export async function estimateStorage(): Promise<{ usage: number; quota: number }> {
  try {
    if (navigator.storage?.estimate) {
      const est = await navigator.storage.estimate();
      return { usage: est.usage ?? 0, quota: est.quota ?? 0 };
    }
  } catch {
    /* ignore */
  }
  return { usage: 0, quota: 0 };
}

export function isQuotaError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const e = err as { name?: string; message?: string };
  return e.name === "QuotaExceededError" || /quota/i.test(e.message ?? "");
}
