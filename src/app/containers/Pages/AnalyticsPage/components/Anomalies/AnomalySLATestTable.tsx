import React from 'react';
import styled from 'styled-components';
import { useTable, useSortBy } from 'react-table';
import { AnomalySlaTestData, Column } from 'lib/api/http/SharedTypes';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import SortIcon from '../../icons/performance dashboard/sort.svg';

const Styles = styled.div`
  table {
    width: 100%;
    text-align: left;

    tr {
      background-color: white;
    }
    th {
      background-color: #f7f8fb;
      padding: 20px;
      border-radius: 6px 6px 0px 0px;
    }
    td {
      padding: 20px;
    }
  }
`;

interface AnomalySLATestTableProps {
  readonly columns: Column[];
  readonly data: AnomalySlaTestData[];
}

export const AnomalySLATestTable: React.FC<AnomalySLATestTableProps> = ({ data, columns }) => {
  const classes = AnalyticsStyles();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
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
                    <span className={classes.sortIcon}>{column.Header === 'NAME' ? <img src={SortIcon} alt="sort by name" /> : <span />}</span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
};
