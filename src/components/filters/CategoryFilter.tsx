import { useTimelineContext } from "../../context/TimelineContext";
import type { Category } from "../../types/event";
import styles from "./CategoryFilter.module.css";

type Option = { label: string; value: Category | "all" };

const options: Option[] = [
  { label: "全部", value: "all" },
  { label: "国内", value: "domestic" },
  { label: "国际", value: "international" },
];

export default function CategoryFilter() {
  const { filter, setCategory } = useTimelineContext();

  return (
    <div className={styles.container}>
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`${styles.chip} ${filter.selectedCategory === opt.value ? styles.active : ""}`}
          onClick={() => setCategory(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
