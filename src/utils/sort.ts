import type { TimelineEvent } from "../types/event";

export function sortEvents(events: TimelineEvent[]): TimelineEvent[] {
  return [...events].sort((a, b) => {
    if (a.date.year !== b.date.year) return a.date.year - b.date.year;
    const aMonth = a.date.month ?? 0;
    const bMonth = b.date.month ?? 0;
    if (aMonth !== bMonth) return aMonth - bMonth;
    return (a.date.day ?? 0) - (b.date.day ?? 0);
  });
}
