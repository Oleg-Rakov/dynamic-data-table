import type { TableRow } from '../model/types';

const ROW_COUNT = 1000;
const DELAY_MS = 5000;

export function fetchTableData(): Promise<TableRow[]> {
  const rows: TableRow[] = [];
  for (let i = 1; i <= ROW_COUNT; i++) {
    rows.push({
      id: String(i),
      data: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
      },
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(rows), DELAY_MS);
  });
}
