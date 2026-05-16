import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import styles from "./Header.module.css";

export default function Header() {
  const { theme, toggle } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.logo}>♀</span>
          <span className={styles.title}>她史 · 女性大事件</span>
        </Link>
        <nav>
          <ul className={styles.nav}>
            <li><NavLink to="/" end>时间线</NavLink></li>
            <li><NavLink to="/about">关于</NavLink></li>
            <li>
              <button onClick={toggle} className={styles.themeBtn} aria-label="切换深色模式">
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
