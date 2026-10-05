import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSdsp } from "@/lib/storage/store";
import type { StoredFileMeta } from "@/lib/sdsp/types";

export function MediaViewer({
  file,
  onClose,
}: {
  file: StoredFileMeta | null;
  onClose: () => void;
}) {
  const readBlob = useSdsp((s) => s.readBlob);
  const touch = useSdsp((s) => s.touchRecent);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;
    if (!file) {
      setUrl(null);
      return;
    }
    void (async () => {
      try {
        const rec = await readBlob(file.id);
        if (!rec) {
          if (!cancelled) setError("This file is not available offline.");
          return;
        }
        objectUrl = URL.createObjectURL(rec.blob);
        if (!cancelled) {
          setError(null);
          setUrl(objectUrl);
          void touch({ kind: "file", refId: file.id, title: file.name });
        }
      } catch {
        if (!cancelled) setError("Could not open this file.");
      }
    })();
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [file, readBlob, touch]);

  return (
    <Dialog open={Boolean(file)} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl p-0">
        <DialogHeader className="p-5 pb-0">
          <DialogTitle className="truncate pr-8">{file?.name}</DialogTitle>
        </DialogHeader>
        <div className="p-5 pt-3">
          {error && <p className="text-sm text-destructive">{error}</p>}
          {url && file?.kind === "pdf" && (
            <iframe title={file.name} src={url} className="h-[70vh] w-full rounded-xl bg-secondary" />
          )}
          {url && file?.kind === "image" && (
            <img
              src={url}
              alt={file.name}
              className="max-h-[70vh] w-full rounded-xl object-contain outline outline-1 -outline-offset-1 outline-foreground/10"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
