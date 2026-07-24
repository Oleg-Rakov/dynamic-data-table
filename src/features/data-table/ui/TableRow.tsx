import React from 'react';
import type { CSSProperties } from 'react';
import type {
  DeleteRow,
  TableRow as TableRowData,
  UpdateCell,
} from '../model/types';
import { EditableCell } from './EditableCell';
import { ActionsCell, DeleteButton, Row } from './styles';

interface TableRowProps {
  row: TableRowData;
  columns: string[];
  rowIndex: number;
  style: CSSProperties;
  updateCell: UpdateCell;
  deleteRow: DeleteRow;
}

function TableRowComponent({
  row,
  columns,
  rowIndex,
  style,
  updateCell,
  deleteRow,
}: TableRowProps) {
  return (
    <Row
      role="row"
      aria-rowindex={rowIndex + 2} // 1-based; header occupies index 1
      style={style}
      $columnCount={columns.length}
    >
      {columns.map((column) => (
        <EditableCell
          key={column}
          rowId={row.id}
          columnKey={column}
          value={row.data[column]}
          onCommit={updateCell}
        />
      ))}
      <ActionsCell role="cell">
        <DeleteButton
          type="button"
          aria-label="Delete row"
          onClick={() => deleteRow(row.id)}
        >
          Delete
        </DeleteButton>
      </ActionsCell>
    </Row>
  );
}

// memoized: an unchanged row skips re-render when a sibling row changes.
export const TableRow = React.memo(TableRowComponent);
