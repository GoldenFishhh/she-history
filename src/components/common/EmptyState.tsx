import { useTimelineContext } from "../../context/TimelineContext";

export default function EmptyState() {
  const { clearFilters } = useTimelineContext();

  return (
    <div style={{
      textAlign: "center",
      padding: "var(--space-2xl) var(--space-md)",
      color: "var(--color-text-muted)",
    }}>
      <p style={{ fontSize: "1.1rem", marginBottom: "var(--space-md)" }}>
        没有找到相关事件
      </p>
      <p style={{ fontSize: "0.9rem", marginBottom: "var(--space-lg)" }}>
        试试调整筛选条件或搜索关键词
      </p>
      <button
        onClick={clearFilters}
        style={{
          padding: "var(--space-sm) var(--space-lg)",
          border: "1px solid var(--color-primary)",
          borderRadius: "8px",
          background: "transparent",
          color: "var(--color-primary)",
          fontSize: "0.9rem",
          cursor: "pointer",
        }}
      >
        清除所有筛选
      </button>
    </div>
  );
}
