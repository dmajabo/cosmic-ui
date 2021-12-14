import React from 'react';
import { DataGrid, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { ISession } from 'lib/api/ApiModels/Sessions/apiModel';
import { GridStyles } from 'app/components/Grid/GridStyles';
import TableHeader from './TableHeader';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { gridAscArrow, gridDescArrow } from 'app/components/SVGIcons/arrows';
import Paging from 'app/components/Basic/Paging';
// import { ISelectionGridCellValue } from 'lib/models/general';
import { SessionGridColumns } from '../models';
import { parseFieldAsDate } from 'lib/helpers/general';

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
  const [columns, setColumns] = React.useState<GridColDef[]>([
    {
      field: 'rowIndex',
      headerName: '#',
      minWidth: 70,
      flex: 0,
      resizable: false,
      valueFormatter: (params: GridValueFormatterParams) => +params.value + 1,
    },
    {
      field: SessionGridColumns.timestamp.resField,
      headerName: SessionGridColumns.timestamp.label,
      minWidth: 240,
      flex: 0.25,
      resizable: false,
      valueFormatter: (params: GridValueFormatterParams) => parseFieldAsDate(params.value, `EEE',' LLL d',' yyyy HH:mm aa`),
    },
    { field: SessionGridColumns.sessionId.resField, headerName: SessionGridColumns.sessionId.label, minWidth: 370, flex: 0.5, resizable: false },
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
    {
      field: SessionGridColumns.deviceVendor.resField,
      headerName: SessionGridColumns.deviceVendor.label,
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
  const onChangeColumn = (col: GridColDef) => {
    const _items: GridColDef[] = columns.slice();
    const _index = _items.findIndex(it => it.field === col.field);
    _items[_index].hide = !col.hide;
    setColumns(_items);
  };

  return (
    <>
      <TableHeader columns={columns} count={props.logCount} onChangeColumn={onChangeColumn} />
      <DataGrid
        className={gridStyles.container}
        disableColumnMenu
        hideFooter
        headerHeight={50}
        rowHeight={70}
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
