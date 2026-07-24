import { useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import { useTableData } from '../model/useTableData';
import type { TableItemData } from '../model/types';
import { Toast } from '../../../shared/Toast';
import { VirtualRow } from './VirtualRow';
import {
  Scroll,
  Table,
  HeaderRow,
  HeaderCell,
  COLUMN_WIDTH,
  ACTIONS_WIDTH,
} from './styles';

const ROW_HEIGHT = 48;
const BODY_HEIGHT = 600;

export function DataTable() {
  const { loading, rows, columns, updateCell, deleteRow, notice } =
    useTableData();

  // stable itemData keeps memoized rows from re-rendering on unrelated state changes.
  const itemData = useMemo<TableItemData>(
    () => ({ rows, columns, updateCell, deleteRow }),
    [rows, columns, updateCell, deleteRow],
  );

  if (loading) {
    return <p>Loading…</p>;
  }

  // match the list viewport to the columns so it shares the header's horizontal scroll.
  const bodyWidth = columns.length * COLUMN_WIDTH + ACTIONS_WIDTH;

  return (
    <>
      <Scroll>
        <Table role="table" aria-rowcount={rows.length + 1}>
          <div role="rowgroup">
            <HeaderRow
              role="row"
              aria-rowindex={1}
              $columnCount={columns.length}
            >
              {columns.map((column) => (
                <HeaderCell key={column} role="columnheader">
                  {column}
                </HeaderCell>
              ))}
              <HeaderCell role="columnheader">Actions</HeaderCell>
            </HeaderRow>
          </div>
          <div role="rowgroup">
            <FixedSizeList
              height={BODY_HEIGHT}
              width={bodyWidth}
              itemSize={ROW_HEIGHT}
              itemCount={rows.length}
              itemData={itemData}
              itemKey={(index, data) => data.rows[index].id}
            >
              {VirtualRow}
            </FixedSizeList>
          </div>
        </Table>
      </Scroll>
      <Toast message={notice} />
    </>
  );
}
