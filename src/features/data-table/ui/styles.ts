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
