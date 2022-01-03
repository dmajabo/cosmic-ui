import React from 'react';
import { TablePagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import { ITableColumn } from './model';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { EmptyDataStyles, EmptyText } from '../NoDataStyles/NoDataStyles';

interface IProps<T> {
  columns: ITableColumn[];
  data: T[] | null;
  shouldDisplayRowNumber?: boolean;
  paging?: boolean;
  error?: string | React.ReactNode;
}

const TableComponent: React.FC<IProps<any>> = (props: IProps<any>) => {
  const [rows, setRows] = React.useState<any[] | null>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const classes = TableStyles();

  React.useEffect(() => {
    setRows(props.data);
  }, [props.data]);
  return (
    <>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              {props.columns.map(column => (
                <TableCell key={`${column.id}`} style={{ minWidth: column.minWidth, width: column.width }} className={classes.tableHeadCell}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!props.paging && rows && rows.length
              ? rows.map((row, rowIndex) => {
                  return (
                    <TableRow hover tabIndex={-1} key={`tableRow${row.id}`} className={classes.row}>
                      {props.columns.map((column, index) => {
                        const value = row[column.field];
                        if (props.shouldDisplayRowNumber && index === 0) {
                          return (
                            <TableCell key={column.id} className={classes.tableCell}>
                              {rowIndex + 1}
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} className={classes.tableCell}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              : null}
            {props.paging && rows && rows.length
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => {
                  return (
                    <TableRow hover tabIndex={-1} key={`tableRow${row.id}`} className={classes.row}>
                      {props.columns.map((column, index) => {
                        const value = row[column.field];
                        if (props.shouldDisplayRowNumber && index === 0) {
                          return (
                            <TableCell key={column.id} className={classes.tableCell}>
                              {rowIndex + 1}
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} className={classes.tableCell}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
        {props.data === null && !props.error && (
          <EmptyDataStyles>
            <EmptyText>No data</EmptyText>
          </EmptyDataStyles>
        )}
        {!props.data && props.error && (
          <EmptyDataStyles>
            <ErrorMessage>{props.error}</ErrorMessage>
          </EmptyDataStyles>
        )}
      </TableContainer>
      {props.paging && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
};

export default React.memo(TableComponent);
