import { createFileRoute } from "@tanstack/react-router";
import { NotesBoard } from "@/components/notes/notes-board";

export const Route = createFileRoute("/notes")({
  validateSearch: (search: Record<string, unknown>): { id?: string } =>
    typeof search.id === "string" ? { id: search.id } : {},
  component: NotesPage,
});

function NotesPage() {
  const { id } = Route.useSearch();
  return <NotesBoard initialId={id} />;
}
