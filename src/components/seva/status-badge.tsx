import { Badge } from "@/components/ui/badge";
import { STATUS_LABEL } from "@/lib/sdsp/constants";
import type { SevaStatus } from "@/lib/sdsp/types";

const variant: Record<SevaStatus, "muted" | "progress" | "complete" | "skip" | "outline"> = {
  upcoming: "muted",
  "in-progress": "progress",
  completed: "complete",
  skipped: "skip",
  cancelled: "outline",
};

export function StatusBadge({ status }: { status: SevaStatus }) {
  return (
    <Badge variant={variant[status]}>
      <span className="gu">{STATUS_LABEL[status].gu}</span>
      <span className="ml-1 opacity-70">{STATUS_LABEL[status].en}</span>
    </Badge>
  );
}
