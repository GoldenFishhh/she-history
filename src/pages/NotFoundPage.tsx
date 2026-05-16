import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "页面未找到 — 她史";
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.code}>404</div>
      <p className={styles.message}>这个页面不存在，或者已被移走</p>
      <Link to="/" className={styles.link}>返回时间线</Link>
    </div>
  );
}
