import React from 'react';
import { IDeviceNode } from 'lib/models/topology';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import { ITableColumn } from 'app/components/Basic/Table/model';

interface IProps {
  dataItem: IDeviceNode;
}

const RoutesTab: React.FC<IProps> = (props: IProps) => {
  const [columns] = React.useState<ITableColumn[]>([
    { id: 'subnet', field: 'subnet', label: 'Subnet', minWidth: 160 },
    { id: 'name', field: 'name', label: 'Name', minWidth: 100 },
    { id: 'vin', field: 'vin', label: 'Vin', minWidth: 50 },
    { id: 'status', field: 'status', label: 'Status', minWidth: 70 },
  ]);

  const [rows] = React.useState<any[]>([
    { id: 1, subnet: 'subnet', name: 'Jon', vin: 35, status: 'Ok' },
    { id: 2, subnet: 'Lannister', name: 'Cersei', vin: 42, status: 'Ok' },
    { id: 3, subnet: 'Lannister', name: 'Jaime', vin: 45, status: 'Ok' },
    { id: 4, subnet: 'subnet', name: 'Arya', vin: 16, status: 'Ok' },
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
