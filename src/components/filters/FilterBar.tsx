import { useEvents } from "../../hooks/useEvents";
import { useTimelineContext } from "../../context/TimelineContext";
import SearchInput from "./SearchInput";
import CategoryFilter from "./CategoryFilter";
import TagFilter from "./TagFilter";
import styles from "./FilterBar.module.css";

export default function FilterBar() {
  const { clearFilters } = useTimelineContext();
  const { filteredCount, totalCount } = useEvents();
  const hasFilters = filteredCount < totalCount;

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <SearchInput />
        <CategoryFilter />
        <span className={styles.spacer} />
        <span className={styles.count}>{filteredCount} 条事件</span>
        {hasFilters && (
          <button className={styles.clear} onClick={clearFilters}>清除筛选</button>
        )}
      </div>
      <div className={styles.inner} style={{ marginTop: "var(--space-sm)" }}>
        <TagFilter />
      </div>
    </div>
  );
}
