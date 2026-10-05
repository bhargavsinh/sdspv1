import { createFileRoute } from "@tanstack/react-router";
import { HistoryBoard } from "@/components/history/history-board";

export const Route = createFileRoute("/history")({ component: HistoryPage });

function HistoryPage() {
  return <HistoryBoard />;
}
