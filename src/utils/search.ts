import type { TimelineEvent } from "../types/event";

export function searchEvents(events: TimelineEvent[], query: string): TimelineEvent[] {
  const q = query.trim().toLowerCase();
  if (!q) return events;

  return events.filter((event) => {
    const fields = [event.titleZh, event.titleEn ?? "", event.summary, event.content];
    return fields.some((field) => field.toLowerCase().includes(q));
  });
}
