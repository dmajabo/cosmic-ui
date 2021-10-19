import React from 'react';
import { DataGrid, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { ISession } from 'lib/api/ApiModels/Sessions/apiModel';
import { format } from 'date-fns';
import { GridStyles } from 'app/components/Grid/GridStyles';
import TableHeader from './TableHeader';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { gridAscArrow, gridDescArrow } from 'app/components/SVGIcons/arrows';
import Paging from 'app/components/Basic/Paging';

interface Props {
  data: ISession[];
  logCount: number;
  isError: any;
  pageSize: number;
  currentPage: number;
  onChangeCurrentPage: (_page: number) => void;
  onChangePageSize: (size: number, page?: number) => void;
}

const Table: React.FC<Props> = (props: Props) => {
  const [dataRows, setDataRows] = React.useState<ISession[]>(props.data || []);
  const gridStyles = GridStyles();
  const [columns, setColumns] = React.useState<GridColDef[]>([
    {
      field: 'rowIndex',
      headerName: '#',
      minWidth: 70,
      flex: 0.1,
      resizable: false,
      valueFormatter: (params: GridValueFormatterParams) => +params.value + 1,
    },
    {
      field: 'timestamp',
      headerName: 'Time',
      minWidth: 220,
      flex: 0.5,
      resizable: false,
      valueFormatter: (params: GridValueFormatterParams) => {
        const valueFormatted = new Date(params.value as string);
        return format(valueFormatted, `EEE',' LLL d',' yyyy HH:mm aa`);
      },
    },
    { field: 'sessionId', headerName: 'Session ID', minWidth: 370, flex: 0.5, resizable: false },
    { field: 'flowId', headerName: 'Flow ID', minWidth: 300, flex: 0.5, hide: true, resizable: false },
    { field: 'sourceIp', headerName: 'Source IP', minWidth: 180, flex: 0.5, resizable: false },
    { field: 'sourcePort', headerName: 'Source Port', minWidth: 180, flex: 0.5, resizable: false },
    { field: 'destIp', headerName: 'Destination IP', minWidth: 200, flex: 0.5, resizable: false },
    { field: 'destPort', headerName: 'Destination Port', minWidth: 200, flex: 0.5, resizable: false },
    { field: 'natSourceIp', headerName: 'Nat Source IP', minWidth: 200, flex: 0.5, resizable: false },
    { field: 'natSourcePort', headerName: 'Nat Source Port', minWidth: 200, flex: 0.5, resizable: false },
    { field: 'natDestIp', headerName: 'Nat Destination IP', minWidth: 200, flex: 0.5, hide: true, resizable: false },
    { field: 'natDestPort', headerName: 'Nat Destination Port', minWidth: 200, flex: 0.5, hide: true, resizable: false },
    { field: 'deviceName', headerName: 'Device Name', minWidth: 200, flex: 0.5, resizable: false },
    { field: 'deviceExtId', headerName: 'Device ID', minWidth: 240, flex: 0.5, resizable: false },
    {
      field: 'deviceVendor',
      headerName: 'Vendor',
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
        rowHeight={50}
        rowCount={props.logCount}
        disableSelectionOnClick
        disableColumnFilter
        autoHeight
        error={props.isError}
        rows={dataRows}
        columns={columns}
        pageSize={dataRows ? dataRows.length : 5}
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
