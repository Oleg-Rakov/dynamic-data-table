import styled, { css } from 'styled-components';

// fixed width so header and rows have equal total width and share one horizontal scroll.
export const COLUMN_WIDTH = 160;
export const ACTIONS_WIDTH = 88;

const gridTemplate = css<{ $columnCount: number }>`
  grid-template-columns:
    repeat(${(p) => p.$columnCount}, ${COLUMN_WIDTH}px)
    ${ACTIONS_WIDTH}px;
`;

export const Scroll = styled.div`
  overflow-x: auto;
`;

export const Table = styled.div`
  width: max-content;
  border: 1px solid #ddd;
  font-family: sans-serif;
  font-size: 14px;
`;

export const HeaderRow = styled.div<{ $columnCount: number }>`
  display: grid;
  ${gridTemplate};
  background: #f5f5f5;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
`;

export const HeaderCell = styled.div`
  padding: 12px;
`;

export const Row = styled.div<{ $columnCount: number }>`
  display: grid;
  ${gridTemplate};
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
`;

export const Cell = styled.div`
  overflow: hidden;
`;

const cellBox = css`
  height: 100%;
  padding: 12px;
  box-sizing: border-box;
  font: inherit;
`;

export const CellDisplay = styled.button`
  ${cellBox};
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CellInput = styled.input<{ $invalid: boolean }>`
  ${cellBox};
  width: 100%;
  border: 1px solid ${(p) => (p.$invalid ? '#d33' : '#4a90e2')};
  outline: none;
`;

export const ActionsCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DeleteButton = styled.button`
  border: 1px solid #d33;
  background: none;
  color: #d33;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;

  &:hover {
    background: #d33;
    color: #fff;
  }
`;

export const Toolbar = styled.div`
  margin-bottom: 12px;
`;

export const AddButton = styled.button`
  border: 1px solid #4a90e2;
  background: #4a90e2;
  color: #fff;
  border-radius: 4px;
  padding: 8px 16px;
  font: inherit;
  cursor: pointer;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalDialog = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  width: 320px;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  box-sizing: border-box;
  font-family: sans-serif;
`;

export const ModalTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 18px;
`;

export const FieldLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-size: 14px;
`;

export const FieldInput = styled.input<{ $invalid: boolean }>`
  display: block;
  width: 100%;
  margin-top: 4px;
  padding: 8px;
  box-sizing: border-box;
  font: inherit;
  border: 1px solid ${(p) => (p.$invalid ? '#d33' : '#ccc')};
  border-radius: 4px;
  outline: none;
`;

export const FieldError = styled.span`
  display: block;
  margin-top: 4px;
  color: #d33;
  font-size: 12px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
`;

export const SecondaryButton = styled.button`
  border: 1px solid #ccc;
  background: none;
  border-radius: 4px;
  padding: 8px 16px;
  font: inherit;
  cursor: pointer;
`;

export const PrimaryButton = styled.button`
  border: 1px solid #4a90e2;
  background: #4a90e2;
  color: #fff;
  border-radius: 4px;
  padding: 8px 16px;
  font: inherit;
  cursor: pointer;
`;
