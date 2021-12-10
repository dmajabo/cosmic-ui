import React from 'react';
import { DataGrid, GridValueFormatterParams } from '@mui/x-data-grid';
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

interface Props {
  data: ISession[];
  logCount: number;
  isError: any;
  pageSize: number;
  currentPage: number;
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
      id: `sessions${SessionGridColumns.sessionId.resField}`,
      field: SessionGridColumns.sessionId.resField,
      headerName: SessionGridColumns.sessionId.label,
      label: SessionGridColumns.sessionId.label,
      minWidth: 370,
      flex: 0.5,
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
      id: `sessions${SessionGridColumns.natSourceIp.resField}`,
      field: SessionGridColumns.natSourceIp.resField,
      headerName: SessionGridColumns.natSourceIp.label,
      label: SessionGridColumns.natSourceIp.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
    },
    {
      id: `sessions${SessionGridColumns.natSourcePort.resField}`,
      field: SessionGridColumns.natSourcePort.resField,
      headerName: SessionGridColumns.natSourcePort.label,
      label: SessionGridColumns.natSourcePort.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
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
      valueFormatter: (params: GridValueFormatterParams) => {
        if (params.value === AccountVendorTypes.AMAZON_AWS) return 'AMAZON AWS';
        if (params.value === AccountVendorTypes.CISCO_MERAKI) return 'CISCO MERAKI';
        return params.value;
      },
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
        headerHeight={50}
        rowHeight={50}
        rowCount={props.logCount}
        disableColumnFilter
        autoHeight
        error={props.isError}
        rows={dataRows}
        columns={columns}
        pageSize={dataRows ? dataRows.length : 0}
        components={{
          ColumnUnsortedIcon: () => null,
          ColumnSortedAscendingIcon: () => <>{gridAscArrow}</>,
          ColumnSortedDescendingIcon: () => <>{gridDescArrow}</>,
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
