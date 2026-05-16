import { useTimelineContext } from "../../context/TimelineContext";
import { useTags } from "../../hooks/useCategories";
import styles from "./TagFilter.module.css";

export default function TagFilter() {
  const tags = useTags();
  const { filter, toggleTag } = useTimelineContext();

  if (tags.length === 0) return null;

  return (
    <div className={styles.container}>
      {tags.map((tag) => (
        <button
          key={tag.id}
          className={`${styles.chip} ${filter.selectedTagIds.includes(tag.id) ? styles.active : ""}`}
          onClick={() => toggleTag(tag.id)}
        >
          {tag.labelZh}
        </button>
      ))}
    </div>
  );
}
