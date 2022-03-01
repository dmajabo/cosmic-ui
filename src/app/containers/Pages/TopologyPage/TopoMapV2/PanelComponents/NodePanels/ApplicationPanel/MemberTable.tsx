import React from 'react';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { TableWrapperStyles } from 'app/components/Basic/Table/styles';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import { MemberAppNodeData, TopoNodeMember } from 'lib/api/ApiModels/Topology/apiModels';

export interface MemberRow extends Pick<TopoNodeMember, 'name'>, MemberAppNodeData {}

interface Props {
  data: MemberRow[];
  showLoader: boolean;
  error?: string;
  styles?: Object;
}

function convertSecondsToString(seconds: string): string {
  const HOURS = 3600;
  if (!seconds) {
    return `--`;
  }
  const inHours = parseInt(seconds) / HOURS;
  if (inHours > 24) {
    const inDays = inHours / 24;
    const remainingHours = inDays % 24;
    return `${inDays.toFixed(0)} days, ${remainingHours.toFixed(0)} hours`;
  } else {
    if (inHours < 1) {
      const minutes = (inHours * 60).toFixed(0);
      return parseInt(minutes) <= 1 ? `${minutes} minute` : `${minutes} minutes`;
    }
    const inHoursInNum = parseInt(inHours.toFixed(0));
    return inHoursInNum <= 1 ? `${inHoursInNum} hour` : `${inHoursInNum} hours`;
  }
}

const MemberTable: React.FC<Props> = (props: Props) => {
  const classes = TableStyles();
  return (
    <TableWrapperStyles style={props.styles}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: '80px' }} className={classes.tableHeadCell}>
                Destination
              </TableCell>
              <TableCell style={{ minWidth: '80px' }} className={classes.tableHeadCell}>
                Protocol
              </TableCell>
              <TableCell style={{ minWidth: '80px' }} className={classes.tableHeadCell}>
                Port
              </TableCell>
              <TableCell style={{ minWidth: '60px' }} className={classes.tableHeadCell}>
                Sent
              </TableCell>
              <TableCell style={{ minWidth: '60px' }} className={classes.tableHeadCell}>
                Received
              </TableCell>
              <TableCell style={{ minWidth: '60px' }} className={classes.tableHeadCell}>
                Flows
              </TableCell>
              <TableCell style={{ minWidth: '80px' }} className={classes.tableHeadCell}>
                Active Time
              </TableCell>
              <TableCell style={{ minWidth: '60px' }} className={classes.tableHeadCell}>
                # of Clients
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data && props.data.length
              ? props.data.map((row, rowIndex) => {
                  return (
                    <TableRow hover tabIndex={-1} key={`tableRow${row}${rowIndex}`} className={classes.row}>
                      <TableCell className={classes.tableCell}>{row.name}</TableCell>
                      <TableCell className={classes.tableCell}>{row.protocol}</TableCell>
                      <TableCell className={classes.tableCell}>{row.port}</TableCell>
                      <TableCell className={classes.tableCell}>{row.sent}</TableCell>
                      <TableCell className={classes.tableCell}>{row.recv}</TableCell>
                      <TableCell className={classes.tableCell}>{row.flows}</TableCell>
                      <TableCell className={classes.tableCell}>{convertSecondsToString(row.activeTime)}</TableCell>
                      <TableCell className={classes.tableCell}>{row.clients}</TableCell>
                    </TableRow>
                  );
                })
              : null}
            {(!props.data || !props.data.length) && !props.showLoader && !props.error && (
              <TableRow className={classes.row}>
                <TableCell className={classes.tableCell} colSpan={5}>
                  <EmptyText>No data</EmptyText>
                </TableCell>
              </TableRow>
            )}
            {(!props.data || !props.data.length) && !props.showLoader && props.error && (
              <TableRow className={classes.row}>
                <TableCell className={classes.tableCell} colSpan={5}>
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

export default React.memo(MemberTable);
