import type { ListChildComponentProps } from 'react-window';
import type { TableItemData } from '../model/types';
import { TableRow } from './TableRow';

// react-window renders this per visible index; it only decides which rows are in the DOM.
export function VirtualRow({
  index,
  style,
  data,
}: ListChildComponentProps<TableItemData>) {
  return (
    <TableRow
      row={data.rows[index]}
      columns={data.columns}
      rowIndex={index}
      style={style}
    />
  );
}
