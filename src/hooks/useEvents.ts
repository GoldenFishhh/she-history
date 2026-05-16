import { useMemo } from "react";
import type { TimelineEvent } from "../types/event";
import { sortEvents } from "../utils/sort";
import { applyFilters } from "../utils/filter";
import { searchEvents } from "../utils/search";
import { useTimelineContext } from "../context/TimelineContext";
import allEvents from "../data/events.json";

const sortedAll = sortEvents(allEvents as TimelineEvent[]);

export function useEvents() {
  const { filter } = useTimelineContext();

  const result = useMemo(() => {
    const filtered = applyFilters(sortedAll, filter);
    const searched = searchEvents(filtered, filter.searchQuery);
    return {
      events: searched,
      totalCount: sortedAll.length,
      filteredCount: searched.length,
    };
  }, [filter]);

  return result;
}

export function getEventById(id: string): TimelineEvent | undefined {
  return sortedAll.find((e) => e.id === id);
}
