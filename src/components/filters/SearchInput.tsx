import { useState, useEffect } from "react";
import { useTimelineContext } from "../../context/TimelineContext";
import styles from "./SearchInput.module.css";

export default function SearchInput() {
  const { filter, setSearchQuery } = useTimelineContext();
  const [value, setValue] = useState(filter.searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value, setSearchQuery]);

  const handleClear = () => {
    setValue("");
    setSearchQuery("");
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>&#128269;</span>
      <input
        className={styles.input}
        type="text"
        placeholder="搜索事件..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button className={styles.clear} onClick={handleClear} aria-label="清除搜索">×</button>
      )}
    </div>
  );
}
