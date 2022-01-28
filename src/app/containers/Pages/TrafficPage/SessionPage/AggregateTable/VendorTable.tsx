import React from 'react';
import { ISession } from 'lib/api/ApiModels/Sessions/apiModel';
import { SessionGridColumns } from '../models';
import { GridStyles } from 'app/components/Grid/GridStyles';
import { DataGrid, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { parseFieldAsDate } from 'lib/helpers/general';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { gridAscArrow, gridDescArrow } from 'app/components/SVGIcons/arrows';
import { VendorTableWrapper } from './styles';
import VendorHeader from './VendorHeader';

interface Props {
  label: string;
  data: ISession[];
  isLast: boolean;
}
const VendorTable: React.FC<Props> = (props: Props) => {
  const gridStyles = GridStyles();
  const [columns] = React.useState<GridColDef[]>([
    {
      field: SessionGridColumns.timestamp.resField,
      headerName: SessionGridColumns.timestamp.label,
      minWidth: 260,
      flex: 0.25,
      resizable: false,
      valueFormatter: (params: GridValueFormatterParams) => parseFieldAsDate(params.value, `EEE',' LLL d',' yyyy HH:mm aa`),
    },
    // { field: SessionGridColumns.sessionId.resField, headerName: SessionGridColumns.sessionId.label, minWidth: 370, flex: 0.5, resizable: false },
    { field: SessionGridColumns.flowId.resField, headerName: SessionGridColumns.flowId.label, minWidth: 300, flex: 0.5, hide: true, resizable: false },
    { field: SessionGridColumns.sourceIp.resField, headerName: SessionGridColumns.sourceIp.label, minWidth: 180, flex: 0.5, resizable: false },
    { field: SessionGridColumns.sourcePort.resField, headerName: SessionGridColumns.sourcePort.label, minWidth: 180, flex: 0.5, resizable: false },
    { field: SessionGridColumns.destIp.resField, headerName: SessionGridColumns.destIp.label, minWidth: 200, flex: 0.5, resizable: false },
    { field: SessionGridColumns.destPort.resField, headerName: SessionGridColumns.destPort.label, minWidth: 200, flex: 0.5, resizable: false },
    { field: SessionGridColumns.natSourceIp.resField, headerName: SessionGridColumns.natSourceIp.label, minWidth: 200, flex: 0.5, resizable: false },
    { field: SessionGridColumns.natSourcePort.resField, headerName: SessionGridColumns.natSourcePort.label, minWidth: 200, flex: 0.5, resizable: false },
    { field: SessionGridColumns.natDestIp.resField, headerName: SessionGridColumns.natDestIp.label, minWidth: 200, flex: 0.5, hide: true, resizable: false },
    { field: SessionGridColumns.natDestPort.resField, headerName: SessionGridColumns.natDestPort.label, minWidth: 200, flex: 0.5, hide: true, resizable: false },
    { field: SessionGridColumns.deviceName.resField, headerName: SessionGridColumns.deviceName.label, minWidth: 200, flex: 0.5, resizable: false },
    { field: SessionGridColumns.deviceExtId.resField, headerName: SessionGridColumns.deviceExtId.label, minWidth: 240, flex: 0.5, resizable: false },
    { field: SessionGridColumns.bytes.resField, headerName: SessionGridColumns.bytes.label, minWidth: 160, flex: 0.5, resizable: false },
    { field: SessionGridColumns.packets.resField, headerName: SessionGridColumns.packets.label, minWidth: 160, flex: 0.5, resizable: false },
    { field: SessionGridColumns.action.resField, headerName: SessionGridColumns.action.label, minWidth: 160, flex: 0.5, resizable: false },
    { field: SessionGridColumns.tcpFlags.resField, headerName: SessionGridColumns.tcpFlags.label, minWidth: 160, flex: 0.5, resizable: false },
    { field: SessionGridColumns.trafficType.resField, headerName: SessionGridColumns.trafficType.label, minWidth: 160, flex: 0.5, resizable: false },
    { field: SessionGridColumns.vnetworkExtId.resField, headerName: SessionGridColumns.vnetworkExtId.label, minWidth: 160, flex: 0.5, resizable: false },
    { field: SessionGridColumns.vnetworkName.resField, headerName: SessionGridColumns.vnetworkName.label, minWidth: 160, flex: 0.5, resizable: false },
    { field: SessionGridColumns.subnetExtId.resField, headerName: SessionGridColumns.subnetExtId.label, minWidth: 160, flex: 0.5, resizable: false },
    { field: SessionGridColumns.subnetName.resField, headerName: SessionGridColumns.subnetName.label, minWidth: 160, flex: 0.5, resizable: false },
    { field: SessionGridColumns.vmExtId.resField, headerName: SessionGridColumns.vmExtId.label, minWidth: 160, flex: 0.5, resizable: false },
    { field: SessionGridColumns.region.resField, headerName: SessionGridColumns.region.label, minWidth: 160, flex: 0.5, resizable: false },
    { field: SessionGridColumns.azId.resField, headerName: SessionGridColumns.azId.label, minWidth: 160, flex: 0.5, resizable: false },
  ]);
  return (
    <VendorTableWrapper margin={props.isLast ? '0' : '0 0 50px 0'}>
      <VendorHeader label={props.label as AccountVendorTypes} />
      <DataGrid
        className={gridStyles.nestedGrid}
        disableColumnMenu
        hideFooter
        headerHeight={40}
        rowHeight={50}
        rowCount={props.data.length}
        disableColumnFilter
        autoHeight
        rows={props.data}
        columns={columns}
        components={{
          ColumnUnsortedIcon: () => null,
          ColumnSortedAscendingIcon: () => <>{gridAscArrow}</>,
          ColumnSortedDescendingIcon: () => <>{gridDescArrow}</>,
        }}
      />
    </VendorTableWrapper>
  );
};

export default React.memo(VendorTable);
