import { useEffect } from "react";
import FilterBar from "../components/filters/FilterBar";
import TimelineView from "../components/timeline/TimelineView";
import EmptyState from "../components/common/EmptyState";
import { useEvents } from "../hooks/useEvents";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const { events } = useEvents();

  useEffect(() => {
    document.title = "她史 · 女性大事件时间线";
  }, []);

  return (
    <>
      <h1 className={styles.title}>女性大事件时间线</h1>
      <p className={styles.subtitle}>记录改变世界的她力量</p>
      <FilterBar />
      {events.length > 0 ? <TimelineView /> : <EmptyState />}
    </>
  );
}
