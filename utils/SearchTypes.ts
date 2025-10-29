export type SortOrder = "asc" | "desc";
export type SortBy = "title" | "author" | "theme" | "year" | "rating";
export interface SearchOptions {
  search?: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  read?: boolean;
  favorite?: boolean;
}
