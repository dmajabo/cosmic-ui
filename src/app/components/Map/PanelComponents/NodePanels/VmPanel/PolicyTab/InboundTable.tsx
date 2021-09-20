import React from 'react';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { TableWrapperStyles } from 'app/components/Basic/Table/styles';
import { IVmRule } from 'lib/api/ApiModels/Metrics/apiModel';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { EmptyDataStyles, EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';

interface Props {
  data: IVmRule[];
  showLoader: boolean;
  error?: string;
  styles?: Object;
}

const InboundTable: React.FC<Props> = (props: Props) => {
  const classes = TableStyles();
  return (
    <TableWrapperStyles style={props.styles}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell}>#</TableCell>
              <TableCell style={{ minWidth: '60px' }} className={classes.tableHeadCell}>
                Policy
              </TableCell>
              <TableCell className={classes.tableHeadCell}>Protocol</TableCell>
              <TableCell style={{ minWidth: '100px' }} className={classes.tableHeadCell}>
                Source
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data && props.data.length
              ? props.data.map((row, rowIndex) => {
                  return (
                    <TableRow hover tabIndex={-1} key={`tableRow${row.id}`} className={classes.row}>
                      <TableCell className={classes.tableCell}>{rowIndex + 1}</TableCell>
                      <TableCell className={classes.tableCell}>Allow</TableCell>
                      <TableCell className={classes.tableCell}>{row.ipProtocol}</TableCell>
                      <TableCell className={classes.tableCell}>{row.cidrs && row.cidrs.length ? row.cidrs[0].name : null}</TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
        {!props.data.length && !props.showLoader && !props.error && (
          <EmptyDataStyles>
            <EmptyText>No data</EmptyText>
          </EmptyDataStyles>
        )}
        {!props.data && props.error && (
          <EmptyDataStyles>
            <ErrorMessage>{props.error}</ErrorMessage>
          </EmptyDataStyles>
        )}
      </TableContainer>
      {props.showLoader && (
        <AbsLoaderWrapper size={40} width="100%" height="100%">
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
    </TableWrapperStyles>
  );
};

export default React.memo(InboundTable);
