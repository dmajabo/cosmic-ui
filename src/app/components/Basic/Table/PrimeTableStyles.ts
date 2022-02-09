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
    .p-datatable-wrapper {
      display: flex;
      min-height: 100%;
    }
    .p-datatable-table {
      width: 100%;
      background: var(--_tableBg);
      border-radius: 6px 6px 0 0;
      border: 2px solid var(--_tableBg);
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
    }
    .p-datatable-table .p-datatable-thead th {
      border: none;
      height: 70px;
      border-bottom: 1px solid var(--_rowBorder);
      font-weight: 700;
      font-size: 12px;
      line-height: 16px;
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
    .p-datatable .p-datatable-emptymessage td {
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
