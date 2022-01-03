import React from 'react';
import { CaptionRow, CaptionContent, TableWrapperStyles } from 'app/components/Basic/Table/styles';
import { IRouteResDataItem, IRouteState } from 'lib/api/ApiModels/Metrics/apiModel';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { EmptyDataStyles, EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { successIcon } from 'app/components/SVGIcons/statusIcons';

interface Props {
  data: IRouteResDataItem;
  styles?: Object;
}

const RouteTable: React.FC<Props> = (props: Props) => {
  const classes = TableStyles();
  return (
    <TableWrapperStyles style={props.styles}>
      {(props.data.name || props.data.extId) && (
        <CaptionRow>
          {props.data.name && (
            <CaptionContent>
              <span className="label">Name:</span>
              <span className="highlightText">{props.data.name}</span>
            </CaptionContent>
          )}
          {props.data.extId && (
            <CaptionContent>
              <span className="label">Id:</span>
              <span className="highlightText">{props.data.extId}</span>
            </CaptionContent>
          )}
        </CaptionRow>
      )}
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
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.routes && props.data.routes.length
              ? props.data.routes.map((row, rowIndex) => (
                  <TableRow hover tabIndex={-1} key={`tableRow${props.data.id}${rowIndex}`} className={classes.row}>
                    <TableCell className={classes.tableCell}>{row.destinationCidr ? row.destinationCidr.name : null}</TableCell>
                    <TableCell className={classes.tableCell}>{row.target}</TableCell>
                    <TableCell className={`${classes.tableCell} ${row.state === IRouteState.Active ? 'cellStatusActive' : ''}`}>
                      {row.state === IRouteState.Active && <IconWrapper width="16px" height="16px" icon={successIcon} styles={{ marginRight: ' 10px' }} />}
                      {row.state}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
        {(!props.data.routes || !props.data.routes.length) && (
          <EmptyDataStyles>
            <EmptyText>No data</EmptyText>
          </EmptyDataStyles>
        )}
      </TableContainer>
    </TableWrapperStyles>
  );
};

export default React.memo(RouteTable);
