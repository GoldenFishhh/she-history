import { useState, useEffect, useCallback } from "react";
import styles from "./CommentSection.module.css";

interface Comment {
  id: string;
  nickname: string;
  content: string;
  timestamp: number;
  eventId: string;
}

const STORAGE_KEY = "she-history-comments";

function loadAll(): Comment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(comments: Comment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function CommentSection({ eventId }: { eventId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setComments(loadAll().filter((c) => c.eventId === eventId));
    setLoading(false);
  }, [eventId]);

  const handleSubmit = useCallback(() => {
    const trimmed = content.trim();
    if (!trimmed) return;

    const comment: Comment = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      nickname: nickname.trim() || "匿名",
      content: trimmed,
      timestamp: Date.now(),
      eventId,
    };

    const all = loadAll();
    all.push(comment);
    saveAll(all);
    setComments((prev) => [...prev, comment]);
    setContent("");
  }, [content, nickname, eventId]);

  const handleDelete = useCallback((id: string) => {
    if (!window.confirm("确定删除这条评论吗？")) return;
    const all = loadAll().filter((c) => c.id !== id);
    saveAll(all);
    setComments((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  if (loading) return null;

  return (
    <div className={styles.section}>
      <h3 className={styles.heading}>评论（{comments.length}）</h3>

      <div className={styles.form}>
        <div className={styles.row}>
          <input
            className={styles.nickname}
            type="text"
            placeholder="你的昵称"
            maxLength={20}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button
            className={styles.submit}
            onClick={handleSubmit}
            disabled={!content.trim()}
          >
            发表评论
          </button>
        </div>
        <textarea
          className={styles.textarea}
          placeholder="写下你的想法..."
          rows={3}
          maxLength={2000}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)" }}>
          Ctrl + Enter 快捷发送
        </span>
      </div>

      {comments.length === 0 ? (
        <p className={styles.empty}>暂无评论，来说点什么吧</p>
      ) : (
        <div className={styles.list}>
          {comments.map((c) => (
            <div key={c.id} className={styles.comment}>
              <div className={styles.commentHeader}>
                <span className={styles.author}>{c.nickname}</span>
                <span className={styles.time}>{formatTime(c.timestamp)}</span>
              </div>
              <p className={styles.commentBody}>{c.content}</p>
              <button className={styles.deleteBtn} onClick={() => handleDelete(c.id)}>
                删除
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
