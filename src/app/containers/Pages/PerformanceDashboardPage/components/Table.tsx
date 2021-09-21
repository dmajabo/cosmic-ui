import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import styled from 'styled-components';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import SortIcon from '../icons/sort.svg';
import * as TableConfig from './react-table-config';

interface Column {
  readonly Header: string;
  readonly accessor: 'name' | 'sourceOrg' | 'sourceNetwork' | 'sourceDevice' | 'destination' | 'averageQoe';
}

interface Data {
  readonly name: string;
  readonly sourceOrg: string;
  readonly sourceNetwork: string;
  readonly sourceDevice: string;
  readonly destination: string;
  readonly averageQoe: JSX.Element;
}

interface TableProps {
  readonly onSelectedRowsUpdate: Function;
  readonly columns: Column[];
  readonly data: Data[];
}

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    width: 100%;
    text-align: left;
    border: 1px solid #e7edf9;

    tr {
      background-color: white;
      border: 1px solid #e7edf9;
    }
    th {
      background-color: #f3f6fc;
      padding: 10px;
      border: 1px solid #e7edf9;
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

const Table: React.FC<TableProps> = ({ onSelectedRowsUpdate, columns, data }) => {
  const classes = PerformanceDashboardStyles();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    },
  );

  useEffect(() => {
    setPageSize(5);
  }, []);
  useEffect(() => {
    const selectedRows = selectedFlatRows.map(row => {
      return row.original;
    });
    onSelectedRowsUpdate(selectedRows);
  }, [selectedFlatRows]);

  return (
    // apply the table props
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map(headerGroup => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map(column => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      <div className={classes.tableHeaderText}>
                        {
                          // Render the header
                          column.render('Header')
                        }
                        <span className={classes.sortIcon}>{column.Header === 'NAME' ? <img src={SortIcon} alt="sort by name" /> : <span />}</span>
                      </div>
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      <div className={classes.tableRowText}>{cell.render('Cell')}</div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <div className={classes.flexContainer}>
          <div>
            <button className={classes.paginationButton} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              <Typography className={classes.paginationText}>{'<<'}</Typography>
            </button>
            <button className={classes.paginationButton} onClick={() => previousPage()} disabled={!canPreviousPage}>
              <Typography className={classes.paginationText}>{'<'}</Typography>
            </button>
            <button className={classes.paginationButton} onClick={() => gotoPage(Number(pageIndex))}>
              <Typography className={classes.activePaginationText}>{Number(pageIndex + 1)}</Typography>
            </button>
            {canNextPage ? (
              <button className={classes.paginationButton} onClick={() => gotoPage(Number(pageIndex + 1))}>
                <Typography className={classes.paginationText}>{Number(pageIndex + 2)}</Typography>
              </button>
            ) : null}
            <button className={classes.paginationButton} onClick={() => nextPage()} disabled={!canNextPage}>
              <Typography className={classes.paginationText}>{'>'}</Typography>
            </button>
            <button className={classes.paginationButton} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              <Typography className={classes.paginationText}>{'>>'}</Typography>
            </button>
          </div>
          <div>
            <span className={classes.paginationText}>View</span>
            <select
              className={classes.paginationSelect}
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[5, 6, 7, 8, 9].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <span className={classes.paginationText}>Items per page</span>
          </div>
          <div>
            <Typography className={classes.paginationText}>{`${Number(pageIndex) * pageSize + 1}-${
              data.length < pageSize * (pageIndex + 1) ? data.length : pageSize * (Number(pageIndex) + 1)
            } out of ${data.length} items`}</Typography>
          </div>
        </div>
      </div>
    </Styles>
  );
};
export default Table;
