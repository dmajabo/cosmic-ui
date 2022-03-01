import { TableWrapperStyles } from 'app/components/Basic/Table/styles';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { MemberAppNodeData } from 'lib/api/ApiModels/Topology/apiModels';
import { convertSecondsToString } from '../../../utils';

export interface TrafficTableRowData extends Pick<MemberAppNodeData, 'sent' | 'recv' | 'flows' | 'activeTime'> {
  name: string;
}

interface ApplicationTableProps {
  data: TrafficTableRowData[];
  showLoader: boolean;
  error?: string;
  styles?: Object;
}

export const ApplicationTable: React.FC<ApplicationTableProps> = props => {
  const classes = TableStyles();
  return (
    <TableWrapperStyles style={props.styles}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: '80px' }} className={classes.tableHeadCell}>
                Application Name
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
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data && props.data.length
              ? props.data.map((row, rowIndex) => {
                  return (
                    <TableRow hover tabIndex={-1} key={`tableRow${row}${rowIndex}`} className={classes.row}>
                      <TableCell className={classes.tableCell}>{row.name}</TableCell>
                      <TableCell className={classes.tableCell}>{row.sent}</TableCell>
                      <TableCell className={classes.tableCell}>{row.recv}</TableCell>
                      <TableCell className={classes.tableCell}>{row.flows}</TableCell>
                      <TableCell className={classes.tableCell}>{convertSecondsToString(row.activeTime)}</TableCell>
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
