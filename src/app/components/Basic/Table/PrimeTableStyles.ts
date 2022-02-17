import { AlertState } from 'lib/api/ApiModels/Workflow/apiModel';
import styled from 'styled-components';

export const TableWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  position: relative;
  .table,
  .tableSM {
    width: 100%;
    height: 100%;
    font-family: 'DMSans';
    font-size: 14px;
    &.tableFixed {
      .p-datatable-table {
        table-layout: fixed;
      }
    }
    .p-datatable-wrapper {
      display: flex;
      min-height: 100%;
      border-radius: 6px 6px 0 0;
    }
    .p-datatable-table {
      width: 100%;
      background: var(--_tableBg);
      border-radius: 6px 6px 0 0;
      border: 2px solid var(--_tableBg);
    }
    .p-datatable-table .p-checkbox {
      margin: 0 auto;
    }
    .p-datatable-table td.p-selection-column {
      text-align: center !important;
    }
    .p-datatable-table tr {
      background: var(--_rowBg);
      color: var(--_primaryTextColor);
      border-top: 1px solid;
      border-bottom: 1px solid;
      border-color: var(--_rowBg);
      &.row-expanded,
      &.p-datatable-row-expansion {
        background: var(--_expandedRowBg);
        border-color: var(--_expandedRowBg);
      }
      &.p-datatable-row-expansion > td {
        padding: 30px 16px;
      }
      &.row-expanded .channelTagBg {
        background: var(--_primaryWhiteColor);
      }
      &.p-selectable-row:not(.p-highlight):not(.p-datatable-emptymessage):hover {
        background: var(--_rowBg);
        color: var(--_primaryTextColor);
      }
    }
    .p-datatable-table .p-datatable-thead th {
      border: none;
      height: 70px;
      border-bottom: 1px solid var(--_rowBorder);
      font-weight: 700;
      font-size: 12px;
      line-height: 16px !important;
      text-transform: uppercase;
      color: var(--_disabledTextColor);
      padding: 25px 10px;
      background: var(--_tableBg);
      font-family: 'DMSans';
      text-align: left;
      position: initial;
      letter-spacing: unset;
      &.p-sortable-column {
        background: var(--_tableBg);
        box-shadow: none;
        &:focus {
          background: var(--_tableBg);
          box-shadow: none;
        }
        &:not(.p-highlight):not(.p-sortable-disabled):hover {
          color: var(--_disabledTextColor);
        }
      }
      &.p-highlight {
        color: var(--_disabledTextColor);
      }
      .p-sortable-column-icon {
        width: 12px;
        height: 12px;
        line-height: 4px;
        text-align: center;
        font-size: 14px;
        color: inherit !important;
      }
      .pi-sort-alt {
        display: none;
      }
      .pi-sort-amount-up-alt:before {
        content: '▲';
      }
      .pi-sort-amount-down:before {
        content: '▼';
      }
    }
    .p-datatable-table .p-datatable-tbody td {
      background: transparent;
      border: none;
      color: var(--_primaryTextColor);
      padding: 16px 10px;
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      white-space: nowrap;
      font-family: 'DMSans';
      text-align: left;
      position: initial;
      letter-spacing: unset;
      border-bottom: 1px solid var(--_rowBorder);
      &.expandCollapseCell {
        text-align: center;
      }
    }
    .p-datatable-table .p-datatable-emptymessage td {
      text-align: center;
      border: none;
      padding: 25px 10px;
    }
  }
  .tableSM .p-datatable-table .p-datatable-thead th {
    height: 50px;
    padding: 12px 10px;
  }
  .tableSM .p-datatable-tbody td {
    padding: 10px;
  }
  .cellToUpperCase {
    text-transform: uppercase;
  }
  .cellToCapitalize {
    text-transform: capitalize;
  }
  .table.autoHeight {
    height: auto;
    .p-datatable-wrapper {
      min-height: auto;
    }
  }
`;

export const NestedTableWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  height: auto;
  display: table;
  table-layout: fixed;
  min-height: 300px;
  position: relative;
  .nestedDescCell {
    white-space: normal;
  }
`;

const getColor = (state: AlertState) => {
  if (state === AlertState.OK || state === AlertState.ACTIVE) return 'var(--_successColor)';
  if (state === AlertState.CLEARED) return 'var(--_highlightColor)';
  return 'var(--_primaryTextColor)';
};

interface StateProps {
  state: AlertState;
}
export const StateCell = styled.div<StateProps>`
  color: ${props => getColor(props.state)};
`;

export const KeyValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .keyValueRow {
    width: 100%;
    margin-bottom: 12px;
    overflow: hidden;
  }
  .key {
    color: var(--_primaryTextColor);
    font-weight: bold;
    margin: 0 8px 0 0;
    display: inline-block;
    vertical-align: top;
    flex-shrink: 0;
  }
  .value {
    color: var(--_disabledTextColor);
    font-weight: normal;
    white-space: normal;
    vertical-align: top;
  }
`;

interface CellValueProps {
  color?: string;
  padding?: string;
}
export const CellStatusValue = styled.div<CellValueProps>`
  display: flex;
  color: ${props => props.color || 'var(--_primaryTextColor)'};
  text-transform: capitalize;
  text-align: left;
  align-items: center;
  padding: ${props => props.padding || '0'};
`;

export const CellSegment = styled.div<CellValueProps>`
  display: flex;
  align-items: center;
  span.color {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 6px;
    margin: 0 12px 0 0;
    flex-shrink: 0;
    background: ${props => props.color || 'transparent'};
  }
  span.name {
    display: inline-block;
  }
`;
