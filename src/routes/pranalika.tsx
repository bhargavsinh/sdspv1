import { createFileRoute } from "@tanstack/react-router";
import { PranalikaBoard } from "@/components/pranalika/pranalika-board";

export const Route = createFileRoute("/pranalika")({
  validateSearch: (search: Record<string, unknown>): { id?: string } =>
    typeof search.id === "string" ? { id: search.id } : {},
  component: PranalikaPage,
});

function PranalikaPage() {
  const { id } = Route.useSearch();
  return <PranalikaBoard initialId={id} />;
}
