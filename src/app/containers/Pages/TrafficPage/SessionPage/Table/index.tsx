import React from 'react';
import { DataGrid, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import { ISession } from 'lib/api/ApiModels/Sessions/apiModel';
import { GridStyles } from 'app/components/Grid/GridStyles';
import TableHeader from './TableHeader';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { gridAscArrow, gridDescArrow } from 'app/components/SVGIcons/arrows';
import Paging from 'app/components/Basic/Paging';
// import { ISelectionGridCellValue } from 'lib/models/general';
import { SessionGridColumns } from '../models';
import { parseFieldAsDate } from 'lib/helpers/general';
import { IColumn } from 'lib/models/grid';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { getVendorObject } from '../AggregateTable/helper';
import { VendorTdWrapper } from '../AggregateTable/styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
interface Props {
  data: ISession[];
  logCount: number;
  error: string;
  pageSize: number;
  currentPage: number;
  rowHeight?: number;
  onChangeCurrentPage: (_page: number) => void;
  onChangePageSize: (size: number, page?: number) => void;
  // onSetSelection: (values: ISelectionGridCellValue[]) => void;
}

const Table: React.FC<Props> = (props: Props) => {
  const [dataRows, setDataRows] = React.useState<ISession[]>(props.data || []);
  const gridStyles = GridStyles();
  const [columns, setColumns] = React.useState<IColumn[]>([
    {
      id: `sessions${SessionGridColumns.timestamp.resField}`,
      field: SessionGridColumns.timestamp.resField,
      headerName: SessionGridColumns.timestamp.label,
      label: SessionGridColumns.timestamp.label,
      minWidth: 240,
      flex: 0.25,
      resizable: false,
      valueFormatter: (params: GridValueFormatterParams) => parseFieldAsDate(params.value, `EEE',' LLL d',' yyyy HH:mm aa`),
    },
    {
      id: `sessions${SessionGridColumns.startTime.resField}`,
      field: SessionGridColumns.startTime.resField,
      headerName: SessionGridColumns.startTime.label,
      label: SessionGridColumns.startTime.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.endTime.resField}`,
      field: SessionGridColumns.endTime.resField,
      headerName: SessionGridColumns.endTime.label,
      label: SessionGridColumns.endTime.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.flowId.resField}`,
      field: SessionGridColumns.flowId.resField,
      headerName: SessionGridColumns.flowId.label,
      label: SessionGridColumns.flowId.label,
      minWidth: 300,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.flowDirection.resField}`,
      field: SessionGridColumns.flowDirection.resField,
      headerName: SessionGridColumns.flowDirection.label,
      label: SessionGridColumns.flowDirection.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.sourceIp.resField}`,
      field: SessionGridColumns.sourceIp.resField,
      headerName: SessionGridColumns.sourceIp.label,
      label: SessionGridColumns.sourceIp.label,
      minWidth: 180,
      flex: 0.5,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.sourcePort.resField}`,
      field: SessionGridColumns.sourcePort.resField,
      headerName: SessionGridColumns.sourcePort.label,
      label: SessionGridColumns.sourcePort.label,
      minWidth: 180,
      flex: 0.5,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.sourceOrgid.resField}`,
      field: SessionGridColumns.sourceOrgid.resField,
      headerName: SessionGridColumns.sourceOrgid.label,
      label: SessionGridColumns.sourceOrgid.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.sourceVnetworkExtid.resField}`,
      field: SessionGridColumns.sourceVnetworkExtid.resField,
      headerName: SessionGridColumns.sourceVnetworkExtid.label,
      label: SessionGridColumns.sourceVnetworkExtid.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.sourceVnetworkName.resField}`,
      field: SessionGridColumns.sourceVnetworkName.resField,
      headerName: SessionGridColumns.sourceVnetworkName.label,
      label: SessionGridColumns.sourceVnetworkName.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.sourceSubnetExtid.resField}`,
      field: SessionGridColumns.sourceSubnetExtid.resField,
      headerName: SessionGridColumns.sourceSubnetExtid.label,
      label: SessionGridColumns.sourceSubnetExtid.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.sourceVmExtid.resField}`,
      field: SessionGridColumns.sourceVmExtid.resField,
      headerName: SessionGridColumns.sourceVmExtid.label,
      label: SessionGridColumns.sourceVmExtid.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.sourceVmName.resField}`,
      field: SessionGridColumns.sourceVmName.resField,
      headerName: SessionGridColumns.sourceVmName.label,
      label: SessionGridColumns.sourceVmName.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.sourceRegion.resField}`,
      field: SessionGridColumns.sourceRegion.resField,
      headerName: SessionGridColumns.sourceRegion.label,
      label: SessionGridColumns.sourceRegion.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.sourceControllerName.resField}`,
      field: SessionGridColumns.sourceControllerName.resField,
      headerName: SessionGridColumns.sourceControllerName.label,
      label: SessionGridColumns.sourceControllerName.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.sourceControllerId.resField}`,
      field: SessionGridColumns.sourceControllerId.resField,
      headerName: SessionGridColumns.sourceControllerId.label,
      label: SessionGridColumns.sourceControllerId.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.sourceSegmentId.resField}`,
      field: SessionGridColumns.sourceSegmentId.resField,
      headerName: SessionGridColumns.sourceSegmentId.label,
      label: SessionGridColumns.sourceSegmentId.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.destIp.resField}`,
      field: SessionGridColumns.destIp.resField,
      headerName: SessionGridColumns.destIp.label,
      label: SessionGridColumns.destIp.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.destPort.resField}`,
      field: SessionGridColumns.destPort.resField,
      headerName: SessionGridColumns.destPort.label,
      label: SessionGridColumns.destPort.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.destOrgid.resField}`,
      field: SessionGridColumns.destOrgid.resField,
      headerName: SessionGridColumns.destOrgid.label,
      label: SessionGridColumns.destOrgid.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.destVnetworkExtid.resField}`,
      field: SessionGridColumns.destVnetworkExtid.resField,
      headerName: SessionGridColumns.destVnetworkExtid.label,
      label: SessionGridColumns.destVnetworkExtid.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.destVnetworkName.resField}`,
      field: SessionGridColumns.destVnetworkName.resField,
      headerName: SessionGridColumns.destVnetworkName.label,
      label: SessionGridColumns.destVnetworkName.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.destSubnetExtid.resField}`,
      field: SessionGridColumns.destSubnetExtid.resField,
      headerName: SessionGridColumns.destSubnetExtid.label,
      label: SessionGridColumns.destSubnetExtid.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.destVmExtid.resField}`,
      field: SessionGridColumns.destVmExtid.resField,
      headerName: SessionGridColumns.destVmExtid.label,
      label: SessionGridColumns.destVmExtid.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.destVmName.resField}`,
      field: SessionGridColumns.destVmName.resField,
      headerName: SessionGridColumns.destVmName.label,
      label: SessionGridColumns.destVmName.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.destRegion.resField}`,
      field: SessionGridColumns.destRegion.resField,
      headerName: SessionGridColumns.destRegion.label,
      label: SessionGridColumns.destRegion.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.destControllerName.resField}`,
      field: SessionGridColumns.destControllerName.resField,
      headerName: SessionGridColumns.destControllerName.label,
      label: SessionGridColumns.destControllerName.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.destControllerId.resField}`,
      field: SessionGridColumns.destControllerId.resField,
      headerName: SessionGridColumns.destControllerId.label,
      label: SessionGridColumns.destControllerId.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.destSegmentId.resField}`,
      field: SessionGridColumns.destSegmentId.resField,
      headerName: SessionGridColumns.destSegmentId.label,
      label: SessionGridColumns.destSegmentId.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.natSourceIp.resField}`,
      field: SessionGridColumns.natSourceIp.resField,
      headerName: SessionGridColumns.natSourceIp.label,
      label: SessionGridColumns.natSourceIp.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
      hide: true,
    },
    {
      id: `sessions${SessionGridColumns.natSourcePort.resField}`,
      field: SessionGridColumns.natSourcePort.resField,
      headerName: SessionGridColumns.natSourcePort.label,
      label: SessionGridColumns.natSourcePort.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
      hide: true,
    },
    {
      id: `sessions${SessionGridColumns.natDestIp.resField}`,
      field: SessionGridColumns.natDestIp.resField,
      headerName: SessionGridColumns.natDestIp.label,
      label: SessionGridColumns.natDestIp.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.natDestPort.resField}`,
      field: SessionGridColumns.natDestPort.resField,
      headerName: SessionGridColumns.natDestPort.label,
      label: SessionGridColumns.natDestPort.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.bytes.resField}`,
      field: SessionGridColumns.bytes.resField,
      headerName: SessionGridColumns.bytes.label,
      label: SessionGridColumns.bytes.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.packets.resField}`,
      field: SessionGridColumns.packets.resField,
      headerName: SessionGridColumns.packets.label,
      label: SessionGridColumns.packets.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.action.resField}`,
      field: SessionGridColumns.action.resField,
      headerName: SessionGridColumns.action.label,
      label: SessionGridColumns.action.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.deviceName.resField}`,
      field: SessionGridColumns.deviceName.resField,
      headerName: SessionGridColumns.deviceName.label,
      label: SessionGridColumns.deviceName.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.deviceExtId.resField}`,
      field: SessionGridColumns.deviceExtId.resField,
      headerName: SessionGridColumns.deviceExtId.label,
      label: SessionGridColumns.deviceExtId.label,
      minWidth: 240,
      flex: 0.5,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.deviceVendor.resField}`,
      field: SessionGridColumns.deviceVendor.resField,
      headerName: SessionGridColumns.deviceVendor.label,
      label: SessionGridColumns.deviceVendor.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
      renderCell: (param: GridRenderCellParams) => {
        const _obj = getVendorObject(param.value as AccountVendorTypes);
        return (
          <VendorTdWrapper>
            {_obj.icon && <IconWrapper customIcon={_obj.icon} width="20px" height="20px" styles={{ margin: '0 8px 0 0' }} />}
            <span>{_obj.label}</span>
          </VendorTdWrapper>
        );
      },
    },
    {
      id: `sessions${SessionGridColumns.deviceNetworkExtid.resField}`,
      field: SessionGridColumns.deviceNetworkExtid.resField,
      headerName: SessionGridColumns.deviceNetworkExtid.label,
      label: SessionGridColumns.deviceNetworkExtid.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.deviceControllerId.resField}`,
      field: SessionGridColumns.deviceControllerId.resField,
      headerName: SessionGridColumns.deviceControllerId.label,
      label: SessionGridColumns.deviceControllerId.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.deviceControllerName.resField}`,
      field: SessionGridColumns.deviceControllerName.resField,
      headerName: SessionGridColumns.deviceControllerName.label,
      label: SessionGridColumns.deviceControllerName.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.tcpFlags.resField}`,
      field: SessionGridColumns.tcpFlags.resField,
      headerName: SessionGridColumns.tcpFlags.label,
      label: SessionGridColumns.tcpFlags.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.trafficType.resField}`,
      field: SessionGridColumns.trafficType.resField,
      headerName: SessionGridColumns.trafficType.label,
      label: SessionGridColumns.trafficType.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.vnetworkExtId.resField}`,
      field: SessionGridColumns.vnetworkExtId.resField,
      headerName: SessionGridColumns.vnetworkExtId.label,
      label: SessionGridColumns.vnetworkExtId.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.vnetworkName.resField}`,
      field: SessionGridColumns.vnetworkName.resField,
      headerName: SessionGridColumns.vnetworkName.label,
      label: SessionGridColumns.vnetworkName.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.subnetExtId.resField}`,
      field: SessionGridColumns.subnetExtId.resField,
      headerName: SessionGridColumns.subnetExtId.label,
      label: SessionGridColumns.subnetExtId.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.subnetName.resField}`,
      field: SessionGridColumns.subnetName.resField,
      headerName: SessionGridColumns.subnetName.label,
      label: SessionGridColumns.subnetName.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.vmExtId.resField}`,
      field: SessionGridColumns.vmExtId.resField,
      headerName: SessionGridColumns.vmExtId.label,
      label: SessionGridColumns.vmExtId.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.vmName.resField}`,
      field: SessionGridColumns.vmName.resField,
      headerName: SessionGridColumns.vmName.label,
      label: SessionGridColumns.vmName.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.region.resField}`,
      field: SessionGridColumns.region.resField,
      headerName: SessionGridColumns.region.label,
      label: SessionGridColumns.region.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.azId.resField}`,
      field: SessionGridColumns.azId.resField,
      headerName: SessionGridColumns.azId.label,
      label: SessionGridColumns.azId.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },

    {
      id: `sessions${SessionGridColumns.protocol.resField}`,
      field: SessionGridColumns.protocol.resField,
      headerName: SessionGridColumns.protocol.label,
      label: SessionGridColumns.protocol.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },

    {
      id: `sessions${SessionGridColumns.policyAction.resField}`,
      field: SessionGridColumns.policyAction.resField,
      headerName: SessionGridColumns.policyAction.label,
      label: SessionGridColumns.policyAction.label,
      minWidth: 200,
      flex: 0.5,
      hide: true,
      resizable: false,
    },
  ]);

  React.useEffect(() => {
    setDataRows(props.data);
  }, [props.data]);

  const onChangePage = (page: number) => {
    props.onChangeCurrentPage(page);
  };
  const onChangePageSize = (size: number, page?: number) => {
    props.onChangePageSize(size, page);
  };
  const onChangeColumn = (col: IColumn) => {
    const _items: IColumn[] = columns.slice();
    const _index = _items.findIndex(it => it.field === col.field);
    _items[_index].hide = !col.hide;
    setColumns(_items);
  };
  const onChangeOrder = (items: IColumn[]) => {
    setColumns(items);
  };

  return (
    <>
      <TableHeader columns={columns} count={props.logCount} onChangeColumn={onChangeColumn} onChangeOrder={onChangeOrder} />
      <DataGrid
        className={gridStyles.container}
        disableColumnMenu
        hideFooter
        headerHeight={70}
        rowHeight={props.rowHeight || 70}
        rowCount={props.logCount}
        disableColumnFilter
        autoHeight
        error={props.error}
        rows={dataRows}
        columns={columns}
        pageSize={dataRows ? dataRows.length : 0}
        components={{
          ColumnUnsortedIcon: () => null,
          ColumnSortedAscendingIcon: () => <>{gridAscArrow}</>,
          ColumnSortedDescendingIcon: () => <>{gridDescArrow}</>,
          NoRowsOverlay: () => (
            <AbsLoaderWrapper width="100%" height="100%">
              <ErrorMessage color="var(--_primaryTextColor)" margin="auto">
                No data
              </ErrorMessage>
            </AbsLoaderWrapper>
          ),
          ErrorOverlay: () => <ErrorMessage margin="auto">{props.error}</ErrorMessage>,
          LoadingOverlay: () => (
            <AbsLoaderWrapper width="100%" height="calc(100% - 50px)" top="50px">
              <LoadingIndicator margin="auto" />
            </AbsLoaderWrapper>
          ),
        }}
      />
      <Paging
        count={props.logCount}
        disabled={!dataRows.length || props.logCount === 0}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onChangePage={onChangePage}
        onChangePageSize={onChangePageSize}
      />
    </>
  );
};

export default React.memo(Table);
