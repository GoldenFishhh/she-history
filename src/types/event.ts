export interface EventDate {
  year: number;
  month?: number;
  day?: number;
}

export interface EventTag {
  id: string;
  labelZh: string;
  labelEn: string;
}

export interface Source {
  title: string;
  url?: string;
  type: "book" | "article" | "website" | "document";
}

export interface TimelineEvent {
  id: string;
  titleZh: string;
  titleEn?: string;
  date: EventDate;
  dateDisplay: string;
  category: "domestic" | "international";
  tags: EventTag[];
  summary: string;
  content: string;
  sources?: Source[];
  images?: string[];
}

export type Category = "domestic" | "international";

export interface FilterState {
  searchQuery: string;
  selectedCategory: Category | "all";
  selectedTagIds: string[];
}

export interface TagIndex {
  id: string;
  labelZh: string;
  labelEn: string;
  count: number;
}
