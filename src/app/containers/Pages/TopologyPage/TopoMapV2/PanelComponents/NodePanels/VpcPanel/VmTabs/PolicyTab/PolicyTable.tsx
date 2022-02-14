import React from 'react';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { TableHeaderStyles, TableWrapperStyles } from 'app/components/Basic/Table/styles';
import { INetworkRule } from 'lib/api/ApiModels/Topology/apiModels';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';

interface Props {
  data: INetworkRule[];
  showLoader: boolean;
  error?: string;
  styles?: Object;
  title: string;
}

const PolicyTable: React.FC<Props> = (props: Props) => {
  const classes = TableStyles();
  return (
    <TableWrapperStyles style={props.styles}>
      <TableHeaderStyles>{props.title}</TableHeaderStyles>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: '20px' }}>
                #
              </TableCell>
              <TableCell style={{ minWidth: '70px' }} className={classes.tableHeadCell}>
                Policy
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: '110px' }}>
                Protocol
              </TableCell>
              <TableCell style={{ minWidth: '110px' }} className={classes.tableHeadCell}>
                Destination
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: '110px' }}>
                Port Range
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data && props.data.length
              ? props.data.map((row, rowIndex) => {
                  return (
                    <TableRow hover tabIndex={-1} key={`tableRow${rowIndex}`} className={classes.row}>
                      <TableCell className={classes.tableCell}>{rowIndex + 1}</TableCell>
                      <TableCell className={classes.tableCell}>Allow</TableCell>
                      <TableCell className={classes.tableCell} style={{ textTransform: 'uppercase' }}>
                        {row.ipProtocol}
                      </TableCell>
                      <TableCell className={classes.tableCell}>{row.cidrs && row.cidrs.length ? row.cidrs[0].name : null}</TableCell>
                      <TableCell className={classes.tableCell}>{row.fromPort === '0' && row.toPort === '0' ? 'All' : `${row.fromPort} - ${row.toPort}`}</TableCell>
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

export default React.memo(PolicyTable);
