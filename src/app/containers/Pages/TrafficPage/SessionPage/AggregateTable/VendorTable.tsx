import React from 'react';
import { INetworkSession } from 'lib/api/ApiModels/Sessions/apiModel';
// import { SessionGridColumns } from '../models';
import { GridStyles } from 'app/components/Grid/GridStyles';
import { DataGrid } from '@mui/x-data-grid';
// import { parseFieldAsDate } from 'lib/helpers/general';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { gridAscArrow, gridDescArrow } from 'app/components/SVGIcons/arrows';
import { VendorTableWrapper } from './styles';
import VendorHeader from './VendorHeader';
import { IColumn } from 'lib/models/grid';

interface Props {
  label: string;
  data: INetworkSession[];
  columns: IColumn[];
  isLast: boolean;
}
const VendorTable: React.FC<Props> = (props: Props) => {
  const gridStyles = GridStyles();
  // const [columns] = React.useState<GridColDef[]>([
  //   {
  //     ...SessionGridColumns.timestamp,
  //     valueFormatter: (params: GridValueFormatterParams) => parseFieldAsDate(params.value, `EEE',' LLL d',' yyyy HH:mm aa`),
  //   },
  //   { ...SessionGridColumns.startTime },
  //   { ...SessionGridColumns.endTime },
  //   { ...SessionGridColumns.flowId },
  //   { ...SessionGridColumns.flowDirection },
  //   { ...SessionGridColumns.sourceIp },
  //   { ...SessionGridColumns.sourcePort },
  //   { ...SessionGridColumns.sourceOrgid },
  //   { ...SessionGridColumns.sourceVnetworkExtid },
  //   { ...SessionGridColumns.sourceVnetworkName },
  //   { ...SessionGridColumns.sourceSubnetExtid },
  //   { ...SessionGridColumns.sourceVmExtid },
  //   { ...SessionGridColumns.sourceVmName },
  //   { ...SessionGridColumns.sourceRegion },
  //   { ...SessionGridColumns.sourceControllerName },
  //   { ...SessionGridColumns.sourceControllerId },
  //   { ...SessionGridColumns.sourceSegmentId },
  //   { ...SessionGridColumns.destIp },
  //   { ...SessionGridColumns.destPort },
  //   { ...SessionGridColumns.destOrgid },
  //   { ...SessionGridColumns.destVnetworkExtid },
  //   { ...SessionGridColumns.destVnetworkName },
  //   { ...SessionGridColumns.destSubnetExtid },
  //   { ...SessionGridColumns.destVmExtid },
  //   { ...SessionGridColumns.destVmName },
  //   { ...SessionGridColumns.destRegion },
  //   { ...SessionGridColumns.destControllerName },
  //   { ...SessionGridColumns.destControllerId },
  //   { ...SessionGridColumns.destSegmentId },
  //   { ...SessionGridColumns.natSourceIp },
  //   { ...SessionGridColumns.natSourcePort },
  //   { ...SessionGridColumns.natDestIp },
  //   { ...SessionGridColumns.natDestPort },
  //   { ...SessionGridColumns.deviceName },
  //   { ...SessionGridColumns.deviceExtId },
  //   { ...SessionGridColumns.deviceNetworkExtid },
  //   { ...SessionGridColumns.deviceControllerId },
  //   { ...SessionGridColumns.deviceControllerName },
  //   { ...SessionGridColumns.bytes },
  //   { ...SessionGridColumns.packets },
  //   { ...SessionGridColumns.action },
  //   { ...SessionGridColumns.tcpFlags },
  //   { ...SessionGridColumns.trafficType },
  //   { ...SessionGridColumns.trafficType },
  //   { ...SessionGridColumns.vnetworkName },
  //   { ...SessionGridColumns.subnetExtId },
  //   { ...SessionGridColumns.subnetName },
  //   { ...SessionGridColumns.vmExtId },
  //   { ...SessionGridColumns.region },
  //   { ...SessionGridColumns.azId },
  //   { ...SessionGridColumns.protocol },
  //   { ...SessionGridColumns.policyAction },
  // ]);
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
        columns={props.columns}
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
