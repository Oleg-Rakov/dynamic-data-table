import { useEffect, useState } from 'react';
import { fetchTableData } from '../api/fetchTableData';
import { getColumns } from './table.utils';
import type { TableRow } from './types';

interface TableState {
  loading: boolean;
  rows: TableRow[];
  columns: string[];
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

  return { loading, rows, columns };
}
