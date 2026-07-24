import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { findEmptyFields } from '../model/table.utils';
import type { AddRow } from '../model/types';
import { useFocusTrap } from '../../../shared/useFocusTrap';
import {
  ModalOverlay,
  ModalDialog,
  ModalTitle,
  FieldLabel,
  FieldInput,
  FieldError,
  ModalActions,
  SecondaryButton,
  PrimaryButton,
} from './styles';

interface AddRowModalProps {
  columns: string[];
  onAdd: AddRow;
  onClose: () => void;
}

const emptyValues = (columns: string[]): Record<string, string> =>
  Object.fromEntries(columns.map((column) => [column, '']));

export function AddRowModal({ columns, onAdd, onClose }: AddRowModalProps) {
  const [values, setValues] = useState(() => emptyValues(columns));
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useFocusTrap(dialogRef, onClose);

  const emptyFields = findEmptyFields(columns, values);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (emptyFields.length > 0) {
      setSubmitted(true);
      return;
    }
    onAdd(values);
    onClose();
  };

  return createPortal(
    <ModalOverlay role="presentation" onMouseDown={onClose}>
      <ModalDialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-row-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <ModalTitle id="add-row-title">Add row</ModalTitle>
        <form onSubmit={handleSubmit}>
          {columns.map((column) => {
            const invalid = submitted && emptyFields.includes(column);
            return (
              <FieldLabel key={column}>
                {column}
                <FieldInput
                  $invalid={invalid}
                  aria-invalid={invalid}
                  value={values[column]}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      [column]: event.target.value,
                    }))
                  }
                />
                {invalid && <FieldError>Required</FieldError>}
              </FieldLabel>
            );
          })}
          <ModalActions>
            <SecondaryButton type="button" onClick={onClose}>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit">Add</PrimaryButton>
          </ModalActions>
        </form>
      </ModalDialog>
    </ModalOverlay>,
    document.body,
  );
}
