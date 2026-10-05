import { createFileRoute } from "@tanstack/react-router";
import { SearchPage } from "@/components/search/search-page";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): { q?: string } =>
    typeof search.q === "string" ? { q: search.q } : {},
  component: SearchRoute,
});

function SearchRoute() {
  const { q } = Route.useSearch();
  return <SearchPage initialQuery={q} />;
}
