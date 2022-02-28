import { TableWrapperStyles } from 'app/components/Basic/Table/styles';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { EmptyDataStyles, EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { Uplink } from '../../enum';
import startCase from 'lodash/startCase';

interface UplinkTableProps {
  readonly resourceData: Uplink[];
  readonly styles?: React.CSSProperties;
}

export const UplinksTable: React.FC<UplinkTableProps> = ({ resourceData, styles }) => {
  const classes = TableStyles();
  return (
    <TableWrapperStyles style={styles}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100, fontSize: 12 }}>
                Name
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100, fontSize: 12 }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resourceData && resourceData.length
              ? resourceData.map(resource => (
                  <TableRow hover tabIndex={-1} key={`tableRow_${resource.extId}`} className={classes.row}>
                    <TableCell style={{ fontSize: 12 }} className={classes.tableCell}>
                      {resource.name}
                    </TableCell>
                    <TableCell style={{ fontSize: 12 }} className={classes.tableCell}>
                      {startCase(resource.status)}
                    </TableCell>
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
