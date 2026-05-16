import { useEffect } from "react";
import { useEvents } from "../hooks/useEvents";
import EventCard from "../components/event/EventCard";
import EmptyState from "../components/common/EmptyState";
import styles from "./SearchResultsPage.module.css";

export default function SearchResultsPage() {
  const { events } = useEvents();

  useEffect(() => {
    document.title = "搜索结果 — 她史";
  }, []);

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>搜索结果（{events.length} 条）</h2>
      {events.length > 0 ? (
        <div className={styles.list}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
