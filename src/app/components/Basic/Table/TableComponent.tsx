import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import { ITableColumn } from './model';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { EmptyDataStyles, EmptyText } from '../NoDataStyles/NoDataStyles';

interface IProps<T> {
  columns: ITableColumn[];
  data: T[] | null;
  shouldDisplayRowNumber?: boolean;
  error?: string | React.ReactNode;
}

const TableComponent: React.FC<IProps<any>> = (props: IProps<any>) => {
  const [rows, setRows] = React.useState<any[] | null>([]);
  const classes = TableStyles();

  React.useEffect(() => {
    setRows(props.data);
  }, [props.data]);
  return (
    <TableContainer className={classes.container}>
      <Table stickyHeader aria-label="sticky table" className={classes.table}>
        <TableHead>
          <TableRow>
            {props.columns.map(column => (
              <TableCell key={`${column.id}`} style={{ minWidth: column.minWidth }} className={classes.tableHeadCell}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.length
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
  );
};

export default React.memo(TableComponent);
