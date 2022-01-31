import React from 'react';
import styled from 'styled-components';
import { useTable, useSortBy, useAbsoluteLayout } from 'react-table';
import { AnomalySessionLogsData, Column } from 'lib/api/http/SharedTypes';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import SortIcon from '../../../MetricsPage/icons/performance dashboard/sort';
import { isEmpty } from 'lodash';

const Styles = styled.div`
  overflow-x: auto;
  overflow-y: hidden;

  background-color: white;
  table {
    text-align: left;

    tr {
      height: 70px;
    }
    th {
      background-color: #f7f8fb;
      height: 70px;
      border-radius: 6px 6px 0px 0px;
    }
  }
`;

interface AnomalyBlockTableProps {
  readonly columns: Column[];
  readonly data: AnomalySessionLogsData[];
  readonly sortableHeaders: string[];
}

export const AnomalyBlockTable: React.FC<AnomalyBlockTableProps> = ({ data, columns, sortableHeaders }) => {
  const classes = AnalyticsStyles();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    useAbsoluteLayout,
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
                    {sortableHeaders.includes(column.Header.toString()) && (
                      <span className={classes.sortIcon}>
                        <SortIcon />
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {isEmpty(data) ? (
            <tr>
              <td colSpan={columns.length}>No Data</td>
            </tr>
          ) : (
            rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </Styles>
  );
};
