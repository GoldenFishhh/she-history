import { useEvents } from "../../hooks/useEvents";
import TimelineNode from "./TimelineNode";
import TimelineYearMarker from "./TimelineYearMarker";
import EventCard from "../event/EventCard";
import styles from "./TimelineView.module.css";

export default function TimelineView() {
  const { events } = useEvents();

  const items = buildDisplayItems(events);

  return (
    <div className={styles.container}>
      {items.map((item) => {
        if (item.type === "year") {
          return <TimelineYearMarker key={`year-${item.year}`} year={item.year} />;
        }
        return (
          <TimelineNode key={item.event.id} side={item.side}>
            <EventCard event={item.event} />
          </TimelineNode>
        );
      })}
    </div>
  );
}

type DisplayItem =
  | { type: "year"; year: number }
  | { type: "event"; event: import("../../types/event").TimelineEvent; side: "left" | "right" };

function buildDisplayItems(events: import("../../types/event").TimelineEvent[]): DisplayItem[] {
  const items: DisplayItem[] = [];
  let lastYear: number | null = null;
  let counter = 0;

  for (const event of events) {
    if (event.date.year !== lastYear) {
      items.push({ type: "year", year: event.date.year });
      lastYear = event.date.year;
    }
    items.push({ type: "event", event, side: counter % 2 === 0 ? "left" : "right" });
    counter++;
  }

  return items;
}
