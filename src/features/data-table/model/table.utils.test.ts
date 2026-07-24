import { describe, expect, it } from 'vitest';

import type { TableRow } from './types';
import {
  findEmptyFields,
  getColumns,
  isCellValid,
  updateCellValue,
} from './table.utils';

const rows: TableRow[] = [
  { id: 'a', data: { name: 'Ann', role: 'Dev' } },
  { id: 'b', data: { name: 'Bob', role: 'QA' } },
];

describe('getColumns', () => {
  it('derives columns from the first row', () => {
    expect(getColumns(rows)).toEqual(['name', 'role']);
  });

  it('returns no columns for an empty table', () => {
    expect(getColumns([])).toEqual([]);
  });
});

describe('isCellValid', () => {
  it('rejects empty and whitespace-only values', () => {
    expect(isCellValid('')).toBe(false);
    expect(isCellValid('   ')).toBe(false);
  });

  it('accepts non-empty values', () => {
    expect(isCellValid('x')).toBe(true);
  });
});

describe('findEmptyFields', () => {
  it('flags every empty or missing dynamic field', () => {
    expect(
      findEmptyFields(['name', 'role'], { name: 'Ann', role: '  ' }),
    ).toEqual(['role']);
    expect(findEmptyFields(['name', 'role'], { name: 'Ann' })).toEqual([
      'role',
    ]);
  });

  it('returns nothing when all fields are filled', () => {
    expect(
      findEmptyFields(['name', 'role'], { name: 'Ann', role: 'Dev' }),
    ).toEqual([]);
  });
});

describe('updateCellValue', () => {
  it('immutably updates the target cell', () => {
    const updated = updateCellValue(rows, 'a', 'role', 'Lead');
    expect(updated[0].data.role).toBe('Lead');
    expect(rows[0].data.role).toBe('Dev'); // original untouched
  });

  it('keeps referential identity of untouched rows (load-bearing for React.memo)', () => {
    const updated = updateCellValue(rows, 'a', 'role', 'Lead');
    expect(updated[1]).toBe(rows[1]);
    expect(updated[0]).not.toBe(rows[0]);
  });
});
