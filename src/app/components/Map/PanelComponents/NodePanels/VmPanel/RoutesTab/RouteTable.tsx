import React from 'react';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { TableWrapperStyles } from 'app/components/Basic/Table/styles';
import { IRouteResDataItem, IRouteState } from 'lib/api/ApiModels/Metrics/apiModel';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { EmptyDataStyles, EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { successIcon } from 'app/components/SVGIcons/statusIcons';

interface Props {
  data: IRouteResDataItem[];
  showLoader: boolean;
  error?: string;
  styles?: Object;
}

const RouteTable: React.FC<Props> = (props: Props) => {
  const classes = TableStyles();
  return (
    <TableWrapperStyles style={props.styles}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell}>Destination</TableCell>
              <TableCell className={classes.tableHeadCell}>Next Hop</TableCell>
              <TableCell className={classes.tableHeadCell}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data && props.data.length
              ? props.data.map((row, rowIndex) => {
                  if (!row.routes || !row.routes.length) {
                    return null;
                  }
                  return row.routes.map((route, routeIndex) => {
                    return (
                      <TableRow hover tabIndex={-1} key={`tableRow${row.id}${routeIndex}`} className={classes.row}>
                        <TableCell className={classes.tableCell}>{route.destinationCidr ? route.destinationCidr.name : null}</TableCell>
                        <TableCell className={classes.tableCell}>{route.target}</TableCell>
                        <TableCell className={`${classes.tableCell} ${route.state === IRouteState.Active ? classes.tableCellStatusActive : ''}`}>
                          {route.state === IRouteState.Active && <IconWrapper width="16px" height="16px" icon={successIcon} styles={{ marginRight: ' 10px' }} />}
                          {route.state}
                        </TableCell>
                      </TableRow>
                    );
                  });
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

export default React.memo(RouteTable);
