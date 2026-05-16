import styles from "./TimelineYearMarker.module.css";

export default function TimelineYearMarker({ year }: { year: number }) {
  const display = year < 0 ? `公元前${Math.abs(year)}年` : `${year}年`;
  return (
    <div className={styles.marker}>
      <span className={styles.year}>{display}</span>
    </div>
  );
}
