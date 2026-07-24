export interface TableRow {
  id: string;
  data: Record<string, string>;
}

export type UpdateCell = (
  rowId: string,
  columnKey: string,
  value: string,
) => void;

export interface TableItemData {
  rows: TableRow[];
  columns: string[];
  updateCell: UpdateCell;
}
