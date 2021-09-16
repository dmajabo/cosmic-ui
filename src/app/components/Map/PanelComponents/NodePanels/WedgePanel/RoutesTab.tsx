import React from 'react';
import { IWedgeNode } from 'lib/models/topology';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import { ITableColumn } from 'app/components/Basic/Table/model';

interface IProps {
  dataItem: IWedgeNode;
}

const RoutesTab: React.FC<IProps> = (props: IProps) => {
  const [columns] = React.useState<ITableColumn[]>([
    { id: 'name', field: 'name', label: 'Name', minWidth: 160 },
    { id: 'association', field: 'association', label: 'Association', minWidth: 100 },
    { id: 'resourceId', field: 'resourceId', label: 'Resource Id', minWidth: 50 },
  ]);

  const [rows] = React.useState<any[]>([
    { id: 1, name: 'subnet', association: 'Jon', resourceId: 35 },
    { id: 2, name: 'Lannister', association: 'Cersei', resourceId: 42 },
    { id: 3, name: 'Lannister', association: 'Jaime', resourceId: 45 },
    { id: 4, name: 'subnet', association: 'Arya', resourceId: 16 },
  ]);
  const classes = TableStyles();
  return (
    <TableContainer>
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
          {rows.map(row => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code} className={classes.row}>
                {columns.map(column => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} className={classes.tableCell}>
                      {column.format && typeof value === 'number' ? column.format(value) : value}
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

export default React.memo(RoutesTab);
