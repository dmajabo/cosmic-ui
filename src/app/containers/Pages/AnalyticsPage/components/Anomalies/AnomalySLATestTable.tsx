import React from 'react';
import styled from 'styled-components';
import { useTable, useSortBy, usePagination } from 'react-table';
import { AnomalyPolicyLogsTableData, AnomalySlaTestData, Column, CostDetailTableData, HitsTableData } from 'lib/api/http/SharedTypes';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import SortIcon from '../../icons/performance dashboard/sort';
import { Typography } from '@mui/material';

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
      text-align: center;
    }
    td {
      padding: 20px;
      text-align: center;
    }
  }
  .pagination {
    padding-top: 0.5rem;
  }
`;

const PAGE_SIZE_OPTIONS = [10, 100, 1000];

interface AnomalySLATestTableProps {
  readonly columns: Column[];
  readonly data: AnomalySlaTestData[] | AnomalyPolicyLogsTableData[] | CostDetailTableData[] | HitsTableData[];
  readonly sortableHeaders: string[];
}

export const AnomalySLATestTable: React.FC<AnomalySLATestTableProps> = ({ data, columns, sortableHeaders }) => {
  const classes = AnalyticsStyles();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination,
  );

  const gotoInitialPage = () => gotoPage(0);

  const gotoCurrentPage = () => gotoPage(Number(pageIndex));

  const gotoNextPageofCurrent = () => gotoPage(Number(pageIndex + 1));

  const gotoLastPage = () => gotoPage(pageCount - 1);

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
                    <span className={classes.sortIcon}>{sortableHeaders.includes(column.Header.toString()) ? <SortIcon /> : <span />}</span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
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
      <div className="pagination">
        <div className={classes.flexContainer}>
          <div>
            <button className={classes.paginationButton} onClick={gotoInitialPage} disabled={!canPreviousPage}>
              <Typography className={classes.paginationText}>{'<<'}</Typography>
            </button>
            <button className={classes.paginationButton} onClick={previousPage} disabled={!canPreviousPage}>
              <Typography className={classes.paginationText}>{'<'}</Typography>
            </button>
            <button className={classes.paginationButton} onClick={gotoCurrentPage}>
              <Typography className={classes.activePaginationText}>{Number(pageIndex + 1)}</Typography>
            </button>
            {canNextPage ? (
              <button className={classes.paginationButton} onClick={gotoNextPageofCurrent}>
                <Typography className={classes.paginationText}>{Number(pageIndex + 2)}</Typography>
              </button>
            ) : null}
            <button className={classes.paginationButton} onClick={nextPage} disabled={!canNextPage}>
              <Typography className={classes.paginationText}>{'>'}</Typography>
            </button>
            <button className={classes.paginationButton} onClick={gotoLastPage} disabled={!canNextPage}>
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
              {PAGE_SIZE_OPTIONS.map(pageSize => (
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
