import { useMemo, useState } from "react";
import {
  Archive,
  Copy,
  Grid3x3,
  Heart,
  List,
  Plus,
  Search,
  Star,
  Trash2,
  Upload,
} from "lucide-react";
import { MediaViewer } from "@/components/viewers/media-viewer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { formatBytes } from "@/lib/utils";
import { useSdsp } from "@/lib/storage/store";
import type { StoredFileMeta } from "@/lib/sdsp/types";
import { cn } from "@/lib/utils";

export function FileManager({ initialFolder, initialFile }: { initialFolder?: string; initialFile?: string }) {
  const folders = useSdsp((s) => s.folders);
  const files = useSdsp((s) => s.files);
  const recents = useSdsp((s) => s.recents);
  const ingest = useSdsp((s) => s.ingestFiles);
  const addFolder = useSdsp((s) => s.addFolder);
  const renameFolder = useSdsp((s) => s.renameFolder);
  const renameFile = useSdsp((s) => s.renameFile);
  const moveFile = useSdsp((s) => s.moveFile);
  const copyFile = useSdsp((s) => s.copyFile);
  const archiveFile = useSdsp((s) => s.archiveFile);
  const removeFile = useSdsp((s) => s.removeFile);
  const toggleFavorite = useSdsp((s) => s.toggleFavoriteFile);
  const usage = useSdsp((s) => s.usage);
  const quota = useSdsp((s) => s.quota);

  const [folderId, setFolderId] = useState(initialFolder ?? "folder_root");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"name" | "date" | "size">("name");
  const [filter, setFilter] = useState<"all" | "pdf" | "image" | "favorite" | "archive">("all");
  const [viewer, setViewer] = useState<StoredFileMeta | null>(
    files.find((f) => f.id === initialFile) ?? null,
  );
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const children = folders.filter((f) => f.parentId === folderId && !f.archived);
  const listed = useMemo(() => {
    let rows = files.filter((f) => {
      if (filter === "archive") return f.archived;
      if (filter === "favorite") return f.favorite;
      if (f.archived) return false;
      if (f.folderId !== folderId && filter === "all") return false;
      if (filter === "pdf") return f.kind === "pdf";
      if (filter === "image") return f.kind === "image";
      return true;
    });
    if (q) rows = rows.filter((f) => f.name.toLowerCase().includes(q.toLowerCase()) || f.tags.some((t) => t.includes(q.toLowerCase())));
    rows = [...rows].sort((a, b) => {
      if (sort === "size") return b.size - a.size;
      if (sort === "date") return b.updatedAt.localeCompare(a.updatedAt);
      return a.name.localeCompare(b.name);
    });
    return rows;
  }, [files, folderId, q, sort, filter]);

  const crumbs: { id: string; name: string }[] = [];
  let cursor: string | null = folderId;
  while (cursor) {
    const f = folders.find((x) => x.id === cursor);
    if (!f) break;
    crumbs.unshift({ id: f.id, name: f.name });
    cursor = f.parentId;
  }

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center gap-2">
        <h1 className="font-display text-3xl font-semibold">Files</h1>
        <div className="ml-auto flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => void addFolder(folderId, "New folder")}>
            <Plus className="size-4" /> Folder
          </Button>
          <label className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground">
            <Upload className="size-4" /> Upload
            <input
              type="file"
              className="sr-only"
              accept=".pdf,.jpg,.jpeg,.png,.webp,.gif,application/pdf,image/*"
              multiple
              onChange={(e) => {
                const list = e.target.files ? Array.from(e.target.files) : [];
                void ingest(list, folderId);
                e.target.value = "";
              }}
            />
          </label>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        {crumbs.map((c, i) => (
          <button key={c.id} type="button" className="hover:text-primary" onClick={() => setFolderId(c.id)}>
            {c.name}
            {i < crumbs.length - 1 ? " /" : ""}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-48 flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search files and tags" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <select
          className="h-11 rounded-lg border border-input bg-background px-3 text-sm"
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          aria-label="Sort"
        >
          <option value="name">Name</option>
          <option value="date">Recent</option>
          <option value="size">Size</option>
        </select>
        <select
          className="h-11 rounded-lg border border-input bg-background px-3 text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          aria-label="Filter"
        >
          <option value="all">All</option>
          <option value="pdf">PDF</option>
          <option value="image">Photos</option>
          <option value="favorite">Favorites</option>
          <option value="archive">Archive</option>
        </select>
        <Button variant={view === "grid" ? "secondary" : "ghost"} size="icon" onClick={() => setView("grid")} aria-label="Grid view">
          <Grid3x3 className="size-4" />
        </Button>
        <Button variant={view === "list" ? "secondary" : "ghost"} size="icon" onClick={() => setView("list")} aria-label="List view">
          <List className="size-4" />
        </Button>
      </div>

      {quota > 0 && (
        <p className="text-xs text-muted-foreground">
          Storage {formatBytes(usage)} of {formatBytes(quota)}
        </p>
      )}

      <div
        className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          void ingest(Array.from(e.dataTransfer.files), folderId);
        }}
      >
        Drop PDFs or photographs here. Documents are stored locally and never rewritten.
      </div>

      {children.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {children.map((folder) => (
            <button
              key={folder.id}
              type="button"
              className="glass rounded-2xl p-4 text-left"
              onClick={() => setFolderId(folder.id)}
              onDoubleClick={() => {
                const name = window.prompt("Rename folder", folder.name);
                if (name) void renameFolder(folder.id, name);
              }}
            >
              <p className="font-medium">{folder.name}</p>
              <p className="text-xs text-muted-foreground">{folder.system ? "System" : "Custom"}</p>
            </button>
          ))}
        </div>
      )}

      {filter === "all" && recents.filter((r) => r.kind === "file").length > 0 && folderId === "folder_root" && (
        <p className="text-xs text-muted-foreground">Recent files are listed under Recents in search.</p>
      )}

      <div className={cn(view === "grid" ? "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" : "space-y-2")}>
        {listed.map((file) => (
          <article
            key={file.id}
            className={cn("glass rounded-2xl p-3", view === "list" && "flex items-center gap-3")}
          >
            <button type="button" className="min-w-0 flex-1 text-left" onClick={() => setViewer(file)}>
              <p className="truncate font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {file.kind.toUpperCase()} · {formatBytes(file.size)}
              </p>
            </button>
            <div className="mt-2 flex items-center gap-1">
              <Button variant="ghost" size="icon" className="size-9" onClick={() => void toggleFavorite(file.id)} aria-label="Favorite">
                {file.favorite ? <Star className="size-4 fill-current" /> : <Heart className="size-4" />}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    More
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      const name = window.prompt("Rename file", file.name);
                      if (name) void renameFile(file.id, name);
                    }}
                  >
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => void copyFile(file.id)}>
                    <Copy className="size-4" /> Copy
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      const dest = window.prompt("Move to folder id", file.folderId);
                      if (dest) void moveFile(file.id, dest);
                    }}
                  >
                    Move
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => void archiveFile(file.id, !file.archived)}>
                    <Archive className="size-4" /> {file.archived ? "Restore" : "Archive"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPendingDelete(file.id)}>
                    <Trash2 className="size-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </article>
        ))}
      </div>

      {listed.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">This folder is empty.</p>}

      <MediaViewer file={viewer} onClose={() => setViewer(null)} />

      <AlertDialog open={Boolean(pendingDelete)} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this file?</AlertDialogTitle>
            <AlertDialogDescription>
              The file is removed from this device. This cannot be undone once the binary is cleared.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingDelete) void removeFile(pendingDelete);
                setPendingDelete(null);
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
