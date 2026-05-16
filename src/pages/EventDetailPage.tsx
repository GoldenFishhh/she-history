import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EventDetail from "../components/event/EventDetail";
import { getEventById } from "../hooks/useEvents";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const event = id ? getEventById(id) : undefined;

  useEffect(() => {
    document.title = event ? `${event.titleZh} — 她史` : "事件未找到 — 她史";
  }, [event]);

  if (!event) {
    return (
      <div style={{ textAlign: "center", padding: "var(--space-2xl)", color: "var(--color-text-muted)" }}>
        事件未找到
      </div>
    );
  }

  return <EventDetail event={event} />;
}
