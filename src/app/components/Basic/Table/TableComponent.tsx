import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import { ITableColumn } from './model';

interface IProps<T> {
  columns: ITableColumn[];
  data: T[];
  shouldDisplayRowNumber?: boolean;
}

const TableComponent: React.FC<IProps<any>> = (props: IProps<any>) => {
  const [columns] = React.useState<ITableColumn[]>(props.columns || []);

  const [rows] = React.useState<any[]>(props.data || []);
  const classes = TableStyles();
  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell key={column.id} style={{ minWidth: column.minWidth }} className={classes.tableHeadCell}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code} className={classes.row}>
                {columns.map((column, index) => {
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
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(TableComponent);
