import type { TableRow } from './types';

export function getColumns(rows: TableRow[]): string[] {
  return rows.length > 0 ? Object.keys(rows[0].data) : [];
}

export function isCellValid(value: string): boolean {
  return value.trim().length > 0;
}

export function updateCellValue(
  rows: TableRow[],
  rowId: string,
  columnKey: string,
  value: string,
): TableRow[] {
  return rows.map((row) =>
    row.id === rowId
      ? { ...row, data: { ...row.data, [columnKey]: value } }
      : row,
  );
}
