import React from 'react';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { TableHeaderStyles, TableWrapperStyles } from 'app/components/Basic/Table/styles';
import { IDeviceRule } from 'lib/api/ApiModels/Metrics/apiModel';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';

interface Props {
  data: IDeviceRule[];
  showLoader: boolean;
  error?: string;
  styles?: Object;
  title?: string;
}

const PolicyTable: React.FC<Props> = (props: Props) => {
  const classes = TableStyles();
  return (
    <TableWrapperStyles style={props.styles}>
      {props.title && <TableHeaderStyles>{props.title}</TableHeaderStyles>}
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: '20px' }}>
                #
              </TableCell>
              <TableCell style={{ minWidth: '80px' }} className={classes.tableHeadCell}>
                Source
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: '110px' }}>
                Source Port
              </TableCell>
              <TableCell style={{ minWidth: '110px' }} className={classes.tableHeadCell}>
                Destination
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: '110px' }}>
                Protocol
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: '110px' }}>
                Policy
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data && props.data.length
              ? props.data.map((row, rowIndex) => {
                  return (
                    <TableRow hover tabIndex={-1} key={`tableRow${row.id || row.name}${rowIndex}`} className={classes.row}>
                      <TableCell className={classes.tableCell}>{rowIndex + 1}</TableCell>
                      <TableCell className={classes.tableCell}>{row.srcCidrs && row.srcCidrs.length && row.srcCidrs[0].name ? row.srcCidrs[0].name : '*'}</TableCell>
                      <TableCell className={classes.tableCell}>{row.fromPort}</TableCell>
                      <TableCell className={classes.tableCell}>{row.destCidrs && row.destCidrs.length && row.destCidrs[0].name ? row.destCidrs[0].name : '*'}</TableCell>
                      <TableCell className={classes.tableCell} style={{ textTransform: 'uppercase' }}>
                        {row.ipProtocol}
                      </TableCell>
                      <TableCell className={classes.tableCell}>{row.policy}</TableCell>
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
