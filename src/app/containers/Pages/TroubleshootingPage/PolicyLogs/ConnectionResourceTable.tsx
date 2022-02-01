import { TableWrapperStyles } from 'app/components/Basic/Table/styles';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import React from 'react';
import { ConnectionResource } from './PolicyLogDetailsDialog';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { EmptyDataStyles, EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';

interface ConnectionResourceTableProps {
  readonly resourceData: ConnectionResource[];
}

export const ConnectionResourceTable: React.FC<ConnectionResourceTableProps> = ({ resourceData }) => {
  const classes = TableStyles();
  return (
    <TableWrapperStyles>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 130 }}>
                Resource Type
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                Name
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                Ext Id
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resourceData && resourceData.length
              ? resourceData.map(resource => (
                  <TableRow hover tabIndex={-1} key={`tableRow_${resource.extId}`} className={classes.row}>
                    <TableCell className={classes.tableCell}>{resource.resourceType}</TableCell>
                    <TableCell className={classes.tableCell}>{resource.name}</TableCell>
                    <TableCell className={classes.tableCell}>{resource.extId}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
        {(!resourceData || !resourceData.length) && (
          <EmptyDataStyles>
            <EmptyText>No data</EmptyText>
          </EmptyDataStyles>
        )}
      </TableContainer>
    </TableWrapperStyles>
  );
};
