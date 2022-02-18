import { TableWrapperStyles } from 'app/components/Basic/Table/styles';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { EmptyDataStyles, EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { OnetoOneAllowedInbound } from '.';

interface OneToOneNATAllowedInboundTableProps {
  readonly resourceData: OnetoOneAllowedInbound[];
  readonly styles?: React.CSSProperties;
}

export const OneToOneNATAllowedInboundTable: React.FC<OneToOneNATAllowedInboundTableProps> = ({ resourceData, styles }) => {
  const classes = TableStyles();
  return (
    <TableWrapperStyles style={styles}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                Protocol
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                Ports
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                Remote IP's
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resourceData && resourceData.length
              ? resourceData.map(resource => (
                  <TableRow hover tabIndex={-1} key={`tableRow_${resource.extId}`} className={classes.row}>
                    <TableCell className={classes.tableCell}>{resource.protocol.toUpperCase()}</TableCell>
                    <TableCell className={classes.tableCell}>{resource.destinationPorts.join(', ')}</TableCell>
                    <TableCell className={classes.tableCell}>{resource.allowedIps.join(', ')}</TableCell>
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
