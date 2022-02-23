import { TableWrapperStyles } from 'app/components/Basic/Table/styles';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { EmptyDataStyles, EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { INetworkPortForwardingRule } from 'lib/api/ApiModels/Topology/apiModels';
import startCase from 'lodash/startCase';

interface PortForwardingTableProps {
  readonly resourceData: INetworkPortForwardingRule[];
  readonly styles?: React.CSSProperties;
}

export const PortForwardingTable: React.FC<PortForwardingTableProps> = ({ resourceData, styles }) => {
  const classes = TableStyles();
  return (
    <TableWrapperStyles style={styles}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                Description
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                Uplink
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                Protocol
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                Public Port
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                LAN IP
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                Local Port
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                Allowed Remote IPs
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resourceData && resourceData.length
              ? resourceData.map(resource => (
                  <TableRow hover tabIndex={-1} key={`tableRow_${resource.extId}`} className={classes.row}>
                    <TableCell className={classes.tableCell}>{resource.name}</TableCell>
                    <TableCell className={classes.tableCell}>{startCase(resource.uplink)}</TableCell>
                    <TableCell className={classes.tableCell}>{resource.protocol.toUpperCase()}</TableCell>
                    <TableCell className={classes.tableCell}>{resource.publicPort}</TableCell>
                    <TableCell className={classes.tableCell}>{resource.lanIp}</TableCell>
                    <TableCell className={classes.tableCell}>{resource.localPort}</TableCell>
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
