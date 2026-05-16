import type { EventTag } from "../../types/event";
import styles from "./EventTags.module.css";

export default function EventTags({ tags }: { tags: EventTag[] }) {
  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <span key={tag.id} className={styles.tag}>{tag.labelZh}</span>
      ))}
    </div>
  );
}
