export interface TableRow {
  id: string;
  data: Record<string, string>;
}

export interface TableItemData {
  rows: TableRow[];
  columns: string[];
}
