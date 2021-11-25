import styled from 'styled-components';
interface TableProps {
  minHeight?: string;
}

export const TableContainer = styled.div<TableProps>`
  width: 100%;
  overflow-x: auto;
  box-sizing: border-box;
  background: transparent;
  min-height: ${props => props.minHeight || '88px'};
  position: relative;
  border-radius: 6px;
  border: 1px solid transparent;
  .largeTable {
    width: calc(100% - 1px);
    font-family: 'DMSans' !important;
    font-style: normal;
    background: var(--__tableBg);
    * {
      font-family: inherit !important;
      text-align: left !important;
    }
    th {
      border: none;
      font-weight: 700;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--_disabledTextColor);
      padding: 25px 12px;
      height: 70px;
      background: var(--_tableBg);
      border-top: 1px solid;
      border-color: var(--_tableBg);
      &:first-child {
        border-left: 1px solid var(--_tableBg);
      }
      &:last-child {
        border-right: 1px solid var(--_tableBg);
      }
    }
    .bodyRow {
      background: var(--_primaryBg);
      transition: background 0.3s linear;
    }
    .expandedRow,
    .nestedRow {
      background: var(--_expandedRowBg);
    }
    .nestedRow {
      td.nestedTd {
        padding: 0;
        border: 1px solid var(--_rowBorder);
      }
    }
    .rowCollapsed td.nestedTd {
      border: none;
    }
    td:not(.nestedTd) {
      background: transparent;
      border: none;
      color: var(--_primaryColor);
      border-bottom: 1px solid;
      border-top: 1px solid;
      border-color: var(--_rowBorder);
      padding: 25px 12px;
      height: 70px;
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      white-space: nowrap;
      letter-spacing: normal;
      &:first-child {
        border-left: 1px solid var(--_rowBorder);
      }
      &:last-child {
        border-right: 1px solid var(--_rowBorder);
      }
    }
  }
`;
