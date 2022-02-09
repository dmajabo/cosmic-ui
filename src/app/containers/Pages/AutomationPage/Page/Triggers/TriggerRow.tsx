import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import { DEFAULT_TRANSITION } from 'lib/constants/general';
import { IGridColumnField } from 'lib/models/grid';
import { IAlertMetaTableItem, TriggerGridColumns } from './model';
import SwitchInput from 'app/components/Inputs/SwitchInput';
import { AlertConfigState, AlertSeverity, IAlertChannel } from 'lib/api/ApiModels/Workflow/apiModel';
import { GridCellTotalTag } from 'app/components/Grid/styles';
import MatSelect from 'app/components/Inputs/MatSelect';
import SeverityOption from '../../Components/SeverityOption/SeverityOption';

interface Props {
  row: IAlertMetaTableItem;
  columns: IGridColumnField[];
}
const TriggerRow: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const onToogleChange = (e: React.ChangeEvent<HTMLInputElement>, row: IAlertMetaTableItem) => {
    console.log(e, row);
  };
  const onSeverityChange = (v: AlertSeverity, row: IAlertMetaTableItem) => {};
  return (
    <React.Fragment>
      <TableRow className={`bodyRow ${open ? 'expandedRow' : ''}`}>
        {props.columns.map((it, colIndex) => {
          if (it.hide) return null;
          if (it.field === 'id') {
            if (!props.row.triggerCount || props.row.triggerCount === 0) {
              return <TableCell key={`tdRow${it.field}${props.row.id}${colIndex}`} />;
            }
            return (
              <TableCell key={`tdRow${it.field}${props.row.id}${colIndex}`}>
                <IconWrapper
                  width="12px"
                  height="12px"
                  styles={{ verticalAlign: 'middle', transform: open ? 'rotate(0)' : 'rotate(-90deg)', transition: `transform ${DEFAULT_TRANSITION}` }}
                  icon={arrowBottomIcon}
                  onClick={() => setOpen(!open)}
                />
              </TableCell>
            );
          }
          if (it.field === TriggerGridColumns.channels.field) {
            return (
              <TableCell key={`tdRow${it.field}${props.row.id}${colIndex}`}>
                {props.row[it.field] && props.row[it.field].length ? (
                  <>
                    {props.row[it.field].map((it: IAlertChannel) => (
                      <>{it.name ? it.name : 'Default Email Recipients'}</>
                    ))}
                  </>
                ) : null}
              </TableCell>
            );
          }
          if (it.field === TriggerGridColumns.severity.field) {
            return (
              <TableCell key={`tdRow${it.field}${props.row.id}${colIndex}`} className="customCell">
                <MatSelect
                  id={`sevirity${props.row.id}`}
                  value={props.row[it.field]}
                  options={[AlertSeverity.LOW, AlertSeverity.MEDIUM, AlertSeverity.HIGH, AlertSeverity.INFO]}
                  onChange={v => onSeverityChange(v, props.row)}
                  styles={{ maxWidth: '160px', minHeight: '38px', margin: 'auto 0' }}
                  selectStyles={{ height: '38px', width: '100%' }}
                  renderValue={(v: string) => <SeverityOption value={v as AlertSeverity} />}
                />
              </TableCell>
            );
          }
          if (it.field === TriggerGridColumns.triggerCount.field) {
            return (
              <TableCell key={`tdRow${it.field}${props.row.id}${colIndex}`} className="customCell">
                <GridCellTotalTag>{props.row[it.field]}</GridCellTotalTag>
              </TableCell>
            );
          }
          if (it.field === TriggerGridColumns.configState.field) {
            return (
              <TableCell key={`tdRow${it.field}${props.row.id}${colIndex}`}>
                <SwitchInput showLabels checked={props.row[it.field] === AlertConfigState.ON} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onToogleChange(e, props.row)} />
              </TableCell>
            );
          }
          return <TableCell key={`tdRow${it.field}${props.row.id}${colIndex}`}>{props.row[it.field]}</TableCell>;
        })}
      </TableRow>
      <TableRow className={`nestedRow ${!open ? 'rowCollapsed' : ''}`}>
        <TableCell className="nestedTd" style={open ? null : { paddingBottom: 0, paddingTop: 0, border: 'none' }} colSpan={props.columns.filter(it => !it.hide).length}>
          <Collapse in={open} timeout="auto" easing="linear" unmountOnExit>
            {props.row.channels && (
              <>Channels</>
              // <>
              // Object.keys(props.row.data).map((key, index) => (
              //   <VendorTable key={`${props.row.session.id}${key}`} columns={props.nestedColumns} isLast={index === Object.keys(props.row.data).length - 1} label={key} data={props.row.data[key]} />
              // )
              // </>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default React.memo(TriggerRow);
