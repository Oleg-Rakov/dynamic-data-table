import { useState } from 'react';
import { isCellValid } from '../model/table.utils';
import type { UpdateCell } from '../model/types';
import { Cell, CellDisplay, CellInput } from './styles';

interface EditableCellProps {
  rowId: string;
  columnKey: string;
  value: string;
  onCommit: UpdateCell;
}

export function EditableCell({
  rowId,
  columnKey,
  value,
  onCommit,
}: EditableCellProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const valid = isCellValid(draft);

  // commit on focus loss; empty/whitespace is discarded, cell reverts to `value`.
  const commit = () => {
    if (valid && draft !== value) onCommit(rowId, columnKey, draft);
    setEditing(false);
  };

  return (
    <Cell role="cell">
      {editing ? (
        <CellInput
          autoFocus
          $invalid={!valid}
          aria-invalid={!valid}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur();
          }}
        />
      ) : (
        <CellDisplay
          type="button"
          title={value}
          onClick={() => {
            setDraft(value);
            setEditing(true);
          }}
        >
          {value}
        </CellDisplay>
      )}
    </Cell>
  );
}
