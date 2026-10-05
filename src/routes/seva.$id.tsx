import { createFileRoute, Link } from "@tanstack/react-router";
import { SevaEditor } from "@/components/seva/seva-editor";
import { useSdsp } from "@/lib/storage/store";

export const Route = createFileRoute("/seva/$id")({ component: SevaDetail });

function SevaDetail() {
  const { id } = Route.useParams();
  const seva = useSdsp((s) => s.nitya.find((x) => x.id === id));
  if (!seva) {
    return (
      <p className="text-sm">
        Seva not found. <Link to="/seva">Back to seva</Link>
      </p>
    );
  }
  return <SevaEditor key={seva.id} seva={seva} />;
}
