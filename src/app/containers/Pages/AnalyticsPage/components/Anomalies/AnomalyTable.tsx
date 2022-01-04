import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTable, useExpanded, useSortBy, Row } from 'react-table';
import { AnomalyCostTableData, AnomalyExperienceTableData, Column, ColumnAccessor } from 'lib/api/http/SharedTypes';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import SortIcon from '../../icons/performance dashboard/sort';

const Styles = styled.div`
  table {
    width: 100%;
    text-align: left;

    tr {
      border-bottom: 1px solid #e6edf9;
    }
    th {
      background-color: #f3f6fc;
      padding: 20px;
      border-bottom: 1px solid #e6edf9;
      border-radius: 6px 6px 0px 0px;
    }
    td {
      padding: 20px;
    }
  }
  .pagination {
    padding-top: 0.5rem;
  }
  .isexpanded {
    background-color: #f7f8fb;
  }
  .notexpanded {
    background-color: white;
  }
  .expandedRow {
    border-left: 4px solid #437fec;
    border-right: 1px solid #e6edf9;
  }
  .notexpandedRow {
    border-left: 1px solid #e6edf9;
    border-right: 1px solid #e6edf9;
  }
`;

interface AnomalyTableProps {
  readonly inputColumns: Column[];
  readonly data: AnomalyExperienceTableData[] | AnomalyCostTableData[];
  readonly subComponent: (row: Row<object>) => JSX.Element;
}

export const AnomalyTable: React.FC<AnomalyTableProps> = ({ inputColumns, data, subComponent }) => {
  const classes = AnalyticsStyles();

  const columns: Column[] = useMemo(
    () => [
      ...inputColumns,
      {
        Header: 'DETAILS',
        id: 'expander',
        accessor: ColumnAccessor.details,
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            <span className={classes.tabTitleContainer}>
              <span>Details</span> {row.isExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </span>
          </span>
        ),
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, visibleColumns } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    useExpanded,
  );

  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className={classes.tableHeaderText}>
                    {column.render('Header')}
                    <span className={classes.sortIcon}>{column.Header === 'NAME' ? <span>{SortIcon}</span> : <span />}</span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            const { role, ...newRowProps } = row.getRowProps();
            return (
              <React.Fragment {...newRowProps}>
                <tr className={row.isExpanded ? 'expandedRow' : 'notexpandedRow'}>
                  {row.cells.map(cell => {
                    return (
                      <td className={row.isExpanded ? 'isexpanded' : 'notexpanded'} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
                {row.isExpanded ? (
                  <tr className={row.isExpanded ? 'expandedRow' : 'notexpandedRow'}>
                    <td className="isexpanded" colSpan={visibleColumns.length}>
                      {subComponent(row)}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
};
