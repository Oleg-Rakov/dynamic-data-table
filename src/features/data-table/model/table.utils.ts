import type { TableRow } from './types';

export function getColumns(rows: TableRow[]): string[] {
  return rows.length > 0 ? Object.keys(rows[0].data) : [];
}
