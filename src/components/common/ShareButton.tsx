import { useState } from "react";

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    gap: "8px",
    marginTop: "16px",
    flexWrap: "wrap",
  },
  btn: {
    padding: "6px 14px",
    border: "1px solid var(--color-border)",
    borderRadius: "6px",
    background: "var(--color-surface)",
    color: "var(--color-text-muted)",
    fontSize: "0.8rem",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  copied: {
    padding: "6px 14px",
    border: "1px solid var(--color-primary)",
    borderRadius: "6px",
    background: "var(--color-primary)",
    color: "#fff",
    fontSize: "0.8rem",
    fontFamily: "inherit",
  },
};

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const url = window.location.href;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${title} — ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = `${title} — ${url}`;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const canShare = typeof navigator.share === "function";

  const handleShare = async () => {
    if (canShare) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div style={styles.wrapper}>
      {canShare && (
        <button style={styles.btn} onClick={handleShare}>
          📤 分享
        </button>
      )}
      <button style={copied ? styles.copied : styles.btn} onClick={handleCopy}>
        {copied ? "已复制链接" : "📋 复制链接"}
      </button>
    </div>
  );
}
