import { useState } from "react";
import { Link } from "react-router-dom";
import type { TimelineEvent } from "../../types/event";
import EventTags from "./EventTags";
import CommentSection from "../comment/CommentSection";
import ShareButton from "../common/ShareButton";
import styles from "./EventDetail.module.css";

function hashColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  const s = 35 + (Math.abs(hash) % 25);
  const l = hash % 2 === 0 ? 22 : 18;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export default function EventDetail({ event }: { event: TimelineEvent }) {
  const categoryLabel = event.category === "domestic" ? "国内" : "国际";
  const paragraphs = event.content.split("\n\n").filter(Boolean);
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const hasImage = event.images && event.images.length > 0 && !imgFailed;
  const bgColor = hashColor(event.id);
  const accentColor = event.category === "domestic"
    ? "var(--color-domestic)"
    : "var(--color-international)";

  return (
    <article className={styles.detail}>
      <Link to="/" className={styles.back}>← 返回时间线</Link>

      <div className={styles.heroBanner} style={{ background: bgColor }}>
        {hasImage && (
          <img
            className={`${styles.heroImg} ${imgLoaded ? styles.heroImgLoaded : ""}`}
            src={event.images![0]}
            alt={event.titleZh}
            onError={() => setImgFailed(true)}
            onLoad={() => setImgLoaded(true)}
          />
        )}
        <div className={styles.heroOverlay}>
          <span className={`${styles.heroBadge}`} style={{ background: accentColor }}>
            {categoryLabel}
          </span>
          <div className={styles.heroDate}>{event.dateDisplay}</div>
          <h1 className={styles.heroTitle}>{event.titleZh}</h1>
          {event.titleEn && (
            <p className={styles.heroTitleEn}>{event.titleEn}</p>
          )}
        </div>
        <div className={styles.heroSymbol}>♀</div>
      </div>

      <div className={styles.header}>
        <EventTags tags={event.tags} />
        <ShareButton title={event.titleZh} />
      </div>

      <div className={styles.content}>
        {paragraphs.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>

      {event.sources && event.sources.length > 0 && (
        <div className={styles.sources}>
          <h3>参考来源</h3>
          <ul>
            {event.sources.map((s, i) => (
              <li key={i}>
                {s.title}
                {s.url && (
                  <> — <a href={s.url} target="_blank" rel="noopener noreferrer">链接</a></>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <CommentSection eventId={event.id} />
    </article>
  );
}
