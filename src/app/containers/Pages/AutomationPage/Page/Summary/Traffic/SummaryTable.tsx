import React from 'react';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { TableHeaderStyles, TableWrapperStyles } from 'app/components/Basic/Table/styles';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';

export interface SummaryTableData {
  readonly name: string;
  readonly sent: number | string;
  readonly received: number | string;
  readonly flows: number;
  readonly activeTime: string;
  readonly clients: number;
}

interface SummaryTableProps {
  readonly data: SummaryTableData[];
  readonly showLoader: boolean;
  readonly error?: string;
  readonly styles?: React.CSSProperties;
  readonly title?: string;
}

const SummaryTable: React.FC<SummaryTableProps> = props => {
  const classes = TableStyles();
  return (
    <TableWrapperStyles style={props.styles}>
      {props.title && <TableHeaderStyles>{props.title}</TableHeaderStyles>}
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: '80px' }} className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell style={{ minWidth: '80px' }} className={classes.tableHeadCell}>
                Sent
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: '110px' }}>
                Received
              </TableCell>
              <TableCell style={{ minWidth: '110px' }} className={classes.tableHeadCell}>
                Flows
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: '110px' }}>
                Active Time
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: '110px' }}>
                Clients
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data && props.data.length
              ? props.data.map((row, rowIndex) => {
                  return (
                    <TableRow hover tabIndex={-1} key={`tableRow${row.name}${rowIndex}`} className={classes.row}>
                      <TableCell className={classes.tableCell}>{row.name || ''}</TableCell>
                      <TableCell className={classes.tableCell}>{row.sent || ''}</TableCell>
                      <TableCell className={classes.tableCell}>{row.received || ''}</TableCell>
                      <TableCell className={classes.tableCell}>{row.flows || ''}</TableCell>
                      <TableCell className={classes.tableCell}>{row.activeTime || ''}</TableCell>
                      <TableCell className={classes.tableCell}>{row.clients || ''}</TableCell>
                    </TableRow>
                  );
                })
              : null}
            {(!props.data || !props.data.length) && !props.showLoader && !props.error && (
              <TableRow className={classes.row}>
                <TableCell className={classes.tableCell} colSpan={6}>
                  <EmptyText>No data</EmptyText>
                </TableCell>
              </TableRow>
            )}
            {(!props.data || !props.data.length) && !props.showLoader && props.error && (
              <TableRow className={classes.row}>
                <TableCell className={classes.tableCell} colSpan={6}>
                  <ErrorMessage>{props.error}</ErrorMessage>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {props.showLoader && (
          <AbsLoaderWrapper width="100%" height="calc(100% - 42px)" top="42px">
            <LoadingIndicator margin="auto" width="24px" height="24px" />
          </AbsLoaderWrapper>
        )}
      </TableContainer>
    </TableWrapperStyles>
  );
};

export default SummaryTable;
