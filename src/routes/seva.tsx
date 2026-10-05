import { createFileRoute } from "@tanstack/react-router";
import { SevaWorkspace } from "@/components/seva/seva-workspace";

export const Route = createFileRoute("/seva")({ component: SevaPage });

function SevaPage() {
  return <SevaWorkspace />;
}
