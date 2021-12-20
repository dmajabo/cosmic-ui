import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import { IAggregateRow } from './models';
import VendorTable from './VendorTable';
import { ISessionsGridFieldColumn } from '../models';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import { VendorTdWrapper } from './styles';
import { DEFAULT_TRANSITION } from 'lib/constants/general';

interface Props {
  row: IAggregateRow;
  columns: ISessionsGridFieldColumn[];
}
const AggregateRow: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow className={`bodyRow ${open ? 'expandedRow' : ''}`}>
        {props.columns.map((it, colIndex) => {
          if (it.hide) return null;
          if (it.resField === 'id') {
            if (!props.row.data) {
              return <TableCell key={`tdRow${it.resField}${props.row.session.id}${colIndex}`} />;
            }
            return (
              <TableCell key={`tdRow${it.resField}${props.row.session.id}${colIndex}`}>
                <IconWrapper
                  width="12px"
                  height="12px"
                  styles={{ verticalAlign: 'middle', transform: open ? 'rotate(-180deg)' : 'rotate(0)', transition: `transform ${DEFAULT_TRANSITION}` }}
                  icon={arrowBottomIcon}
                  onClick={() => setOpen(!open)}
                />
              </TableCell>
            );
          }
          if (it.resField === 'vendors') {
            console.log(props.row[it.resField]);
            return (
              <TableCell key={`tdRow${it.resField}${props.row.session.id}${colIndex}`}>
                {props.row[it.resField].map((v, i) => (
                  <VendorTdWrapper key={`tdRow${it.resField}vendor${props.row.session.id}${i}`}>
                    {v.icon && <IconWrapper width="20px" height="20px" styles={{ margin: '0 8px 0 0' }} icon={v.icon} />}
                    <span>{v.label}</span>
                  </VendorTdWrapper>
                ))}
              </TableCell>
            );
          }
          return <TableCell key={`tdRow${it.resField}${props.row.session.id}${colIndex}`}>{props.row.session[it.resField]}</TableCell>;
        })}
      </TableRow>
      <TableRow className={`nestedRow ${!open ? 'rowCollapsed' : ''}`}>
        <TableCell className="nestedTd" style={open ? null : { paddingBottom: 0, paddingTop: 0, border: 'none' }} colSpan={props.columns.filter(it => !it.hide).length}>
          <Collapse in={open} timeout="auto" easing="linear" unmountOnExit>
            {props.row.data &&
              Object.keys(props.row.data).map((key, index) => (
                <VendorTable key={`${props.row.session.id}${key}`} isLast={index === Object.keys(props.row.data).length - 1} label={key} data={props.row.data[key]} />
              ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default React.memo(AggregateRow);
