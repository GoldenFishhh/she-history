import { useMemo } from "react";
import type { TagIndex } from "../types/event";
import allEvents from "../data/events.json";
import type { TimelineEvent } from "../types/event";

const events = allEvents as TimelineEvent[];

export function useTags(): TagIndex[] {
  return useMemo(() => {
    const map = new Map<string, { labelZh: string; labelEn: string; count: number }>();
    for (const event of events) {
      for (const tag of event.tags) {
        const existing = map.get(tag.id);
        if (existing) {
          existing.count++;
        } else {
          map.set(tag.id, { labelZh: tag.labelZh, labelEn: tag.labelEn, count: 1 });
        }
      }
    }
    return Array.from(map.entries()).map(([id, data]) => ({ id, ...data }));
  }, []);
}
