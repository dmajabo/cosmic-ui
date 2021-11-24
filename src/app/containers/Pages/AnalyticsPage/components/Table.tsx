import { Column } from 'lib/api/http/SharedTypes';
import React from 'react';
import { useTable, useSortBy } from 'react-table';
import styled from 'styled-components';

interface Data {}

interface TableProps {
  readonly columns: Column[];
  readonly data: Data[];
}

const Styles = styled.div`
  table {
    border-spacing: 0;
    width: 100%;
    text-align: left;

    tbody tr {
      background-color: white;
      font-size: 16px;
      font-weight: 400;
      border: 1px solid #e7edf9;
    }
    th {
      padding: 10px;
      color: #848da3;
      font-size: 12px;
    }
    td {
      margin-top: 10;
      padding: 10px;
    }
  }
  .pagination {
    padding-top: 0.5rem;
  }
`;

export const Table: React.FC<TableProps> = ({ columns, data }) => {
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
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}</th>
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
