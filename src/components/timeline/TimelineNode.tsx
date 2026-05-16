import type { ReactNode } from "react";
import styles from "./TimelineNode.module.css";

export default function TimelineNode({ side, children }: { side: "left" | "right"; children: ReactNode }) {
  const sideClass = side === "left" ? styles.left : styles.right;
  return (
    <div className={`${styles.wrapper} ${sideClass}`} style={{ gridColumn: side === "left" ? 1 : 2 }}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
