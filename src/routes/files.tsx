import { createFileRoute } from "@tanstack/react-router";
import { FileManager } from "@/components/files/file-manager";

type FilesSearch = { folder?: string; file?: string };

export const Route = createFileRoute("/files")({
  validateSearch: (search: Record<string, unknown>): FilesSearch => {
    const next: FilesSearch = {};
    if (typeof search.folder === "string") next.folder = search.folder;
    if (typeof search.file === "string") next.file = search.file;
    return next;
  },
  component: FilesPage,
});

function FilesPage() {
  const { folder, file } = Route.useSearch();
  return <FileManager initialFolder={folder} initialFile={file} />;
}
