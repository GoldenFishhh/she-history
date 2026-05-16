import { Link } from "react-router-dom";
import type { TimelineEvent } from "../../types/event";
import EventTags from "./EventTags";
import styles from "./EventCard.module.css";

export default function EventCard({ event }: { event: TimelineEvent }) {
  const categoryLabel = event.category === "domestic" ? "国内" : "国际";
  const badgeClass = event.category === "domestic" ? styles.domestic : styles.international;

  return (
    <Link to={`/event/${event.id}`} className={styles.card}>
      <span className={`${styles.badge} ${badgeClass}`}>{categoryLabel}</span>
      <div className={styles.date}>{event.dateDisplay}</div>
      <h3 className={styles.title}>{event.titleZh}</h3>
      <p className={styles.summary}>{event.summary}</p>
      <EventTags tags={event.tags} />
    </Link>
  );
}
