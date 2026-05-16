import { useState, useEffect } from "react";

const style: Record<string, React.CSSProperties> = {
  button: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "var(--color-primary)",
    color: "#fff",
    border: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    transition: "opacity 0.3s, transform 0.3s",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      style={style.button}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="回到顶部"
      title="回到顶部"
    >
      ↑
    </button>
  );
}
