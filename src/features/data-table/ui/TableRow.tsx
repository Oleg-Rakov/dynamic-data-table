import React from 'react';
import type { CSSProperties } from 'react';
import type { TableRow as TableRowData } from '../model/types';
import { Row, Cell } from './styles';

interface TableRowProps {
  row: TableRowData;
  columns: string[];
  rowIndex: number;
  style: CSSProperties;
}

function TableRowComponent({ row, columns, rowIndex, style }: TableRowProps) {
  return (
    <Row
      role="row"
      aria-rowindex={rowIndex + 2} // 1-based; header occupies index 1
      style={style}
      $columnCount={columns.length}
    >
      {columns.map((column) => (
        <Cell key={column} role="cell">
          {row.data[column]}
        </Cell>
      ))}
    </Row>
  );
}

// memoized: an unchanged row skips re-render when a sibling row changes.
export const TableRow = React.memo(TableRowComponent);
