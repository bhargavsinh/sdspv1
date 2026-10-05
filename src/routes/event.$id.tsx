import { createFileRoute, Link } from "@tanstack/react-router";
import { EventEditor } from "@/components/seva/event-editor";
import { useSdsp } from "@/lib/storage/store";

export const Route = createFileRoute("/event/$id")({ component: EventDetail });

function EventDetail() {
  const { id } = Route.useParams();
  const event = useSdsp((s) => s.events.find((x) => x.id === id));
  if (!event) {
    return (
      <p className="text-sm">
        Event not found. <Link to="/seva">Back to seva</Link>
      </p>
    );
  }
  return <EventEditor key={event.id} event={event} />;
}
