import { useCallback, useEffect, useState } from 'react';
import { fetchTableData } from '../api/fetchTableData';
import { getColumns, updateCellValue } from './table.utils';
import type { TableRow, UpdateCell } from './types';

interface TableState {
  loading: boolean;
  rows: TableRow[];
  columns: string[];
  updateCell: UpdateCell;
}

export function useTableData(): TableState {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<TableRow[]>([]);
  // kept separately so header/form survive deleting every row.
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    fetchTableData().then((result) => {
      if (!active) return;
      setRows(result);
      setColumns(getColumns(result));
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const updateCell = useCallback<UpdateCell>(
    (rowId, columnKey, value) =>
      setRows((cur) => updateCellValue(cur, rowId, columnKey, value)),
    [],
  );

  return { loading, rows, columns, updateCell };
}
