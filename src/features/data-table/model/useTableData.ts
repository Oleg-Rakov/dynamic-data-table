import { useCallback, useEffect, useState } from 'react';
import { useNotice } from '../../../shared/useNotice';
import { fetchTableData } from '../api/fetchTableData';
import { getColumns, updateCellValue } from './table.utils';
import type { AddRow, DeleteRow, TableRow, UpdateCell } from './types';

interface TableState {
  loading: boolean;
  rows: TableRow[];
  columns: string[];
  updateCell: UpdateCell;
  deleteRow: DeleteRow;
  addRow: AddRow;
  notice: string;
}

export function useTableData(): TableState {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<TableRow[]>([]);
  // kept separately so header/form survive deleting every row.
  const [columns, setColumns] = useState<string[]>([]);
  const { notice, notify } = useNotice();

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
      setRows((prevRows) => updateCellValue(prevRows, rowId, columnKey, value)),
    [],
  );

  const deleteRow = useCallback<DeleteRow>(
    (rowId) => {
      setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
      notify('Row deleted');
    },
    [notify],
  );

  const addRow = useCallback<AddRow>(
    (data) => {
      // prepend; DataTable scrolls the list to the top to reveal it.
      setRows((prevRows) => [{ id: crypto.randomUUID(), data }, ...prevRows]);
      notify('Row added');
    },
    [notify],
  );

  return { loading, rows, columns, updateCell, deleteRow, addRow, notice };
}
