import type { TimelineEvent, FilterState } from "../types/event";

export function applyFilters(events: TimelineEvent[], filter: FilterState): TimelineEvent[] {
  return events.filter((event) => {
    if (filter.selectedCategory !== "all" && event.category !== filter.selectedCategory) {
      return false;
    }
    if (filter.selectedTagIds.length > 0) {
      const eventTagIds = event.tags.map((t) => t.id);
      if (!filter.selectedTagIds.every((id) => eventTagIds.includes(id))) {
        return false;
      }
    }
    return true;
  });
}
