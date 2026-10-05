import { createFileRoute } from "@tanstack/react-router";
import { PlannerBoard } from "@/components/planner/planner-board";

export const Route = createFileRoute("/planner")({ component: PlannerPage });

function PlannerPage() {
  return <PlannerBoard />;
}
