import React from 'react';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { TableWrapperStyles } from 'app/components/Basic/Table/styles';
import { IRouteResDataItem } from 'lib/api/ApiModels/Metrics/apiModel';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import RouteTable from './RouteTable';

interface Props {
  data: IRouteResDataItem[];
  showLoader: boolean;
  error?: string;
  styles?: Object;
}

const RouteTableWrapper: React.FC<Props> = (props: Props) => {
  const classes = TableStyles();
  if (!props.data || props.data.length === 0 || props.error || props.showLoader) {
    return (
      <TableWrapperStyles style={props.styles}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table" className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeadCell} style={{ minWidth: 110 }}>
                  Destination
                </TableCell>
                <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                  Next Hop
                </TableCell>
                <TableCell className={classes.tableHeadCell}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
  }
  return (
    <>
      {props.data.map(table => (
        <RouteTable key={`table${table.id}`} data={table} styles={props.styles} />
      ))}
    </>
  );
};

export default React.memo(RouteTableWrapper);
