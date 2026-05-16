import { createContext, useContext, useReducer, useCallback, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import type { FilterState, Category } from "../types/event";

const initialState: FilterState = {
  searchQuery: "",
  selectedCategory: "all",
  selectedTagIds: [],
};

type Action =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_CATEGORY"; payload: Category | "all" }
  | { type: "TOGGLE_TAG"; payload: string }
  | { type: "CLEAR_ALL" };

function reducer(state: FilterState, action: Action): FilterState {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "TOGGLE_TAG":
      return {
        ...state,
        selectedTagIds: state.selectedTagIds.includes(action.payload)
          ? state.selectedTagIds.filter((id) => id !== action.payload)
          : [...state.selectedTagIds, action.payload],
      };
    case "CLEAR_ALL":
      return initialState;
    default:
      return state;
  }
}

function syncToParams(filter: FilterState): URLSearchParams {
  const params = new URLSearchParams();
  if (filter.searchQuery) params.set("q", filter.searchQuery);
  if (filter.selectedCategory !== "all") params.set("category", filter.selectedCategory);
  if (filter.selectedTagIds.length > 0) params.set("tags", filter.selectedTagIds.join(","));
  return params;
}

function parseParams(params: URLSearchParams): FilterState {
  return {
    searchQuery: params.get("q") ?? "",
    selectedCategory: (params.get("category") as Category | null) ?? "all",
    selectedTagIds: params.get("tags")?.split(",").filter(Boolean) ?? [],
  };
}

interface TimelineContextValue {
  filter: FilterState;
  setSearchQuery: (q: string) => void;
  setCategory: (c: Category | "all") => void;
  toggleTag: (id: string) => void;
  clearFilters: () => void;
}

const TimelineContext = createContext<TimelineContextValue | null>(null);

export function TimelineProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialFilter = parseParams(searchParams);

  function reducerWithSync(state: FilterState, action: Action): FilterState {
    const next = reducer(state, action);
    setSearchParams(syncToParams(next), { replace: true });
    return next;
  }

  const [filter, dispatch] = useReducer(reducerWithSync, initialFilter);

  const setSearchQuery = useCallback((q: string) => dispatch({ type: "SET_SEARCH", payload: q }), []);
  const setCategory = useCallback((c: Category | "all") => dispatch({ type: "SET_CATEGORY", payload: c }), []);
  const toggleTag = useCallback((id: string) => dispatch({ type: "TOGGLE_TAG", payload: id }), []);
  const clearFilters = useCallback(() => dispatch({ type: "CLEAR_ALL" }), []);

  return (
    <TimelineContext.Provider value={{ filter, setSearchQuery, setCategory, toggleTag, clearFilters }}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimelineContext() {
  const ctx = useContext(TimelineContext);
  if (!ctx) throw new Error("useTimelineContext must be used inside TimelineProvider");
  return ctx;
}
