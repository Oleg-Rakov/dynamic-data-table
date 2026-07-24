export interface TableRow {
  id: string;
  data: Record<string, string>;
}

export type UpdateCell = (
  rowId: string,
  columnKey: string,
  value: string,
) => void;

export type DeleteRow = (rowId: string) => void;

export type AddRow = (data: Record<string, string>) => void;

export interface TableItemData {
  rows: TableRow[];
  columns: string[];
  updateCell: UpdateCell;
  deleteRow: DeleteRow;
}
