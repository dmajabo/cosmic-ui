import React from 'react';
import { DataGrid, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { ISession } from 'lib/api/ApiModels/Sessions/apiModel';
import { format } from 'date-fns';
import { GridStyles } from 'app/components/Grid/GridStyles';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import TableHeader from './TableHeader';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';

interface Props {
  data: ISession[];
  logCount: number;
  isError: any;
  pageSize: number;
  onChangePageSize: (size: number) => void;
}

const Table: React.FC<Props> = (props: Props) => {
  const [dataRows, setDataRows] = React.useState<ISession[]>(props.data || []);
  const [page, setPage] = React.useState(0);
  const gridStyles = GridStyles();
  const [columns, setColumns] = React.useState<GridColDef[]>([
    {
      field: 'rowIndex',
      headerName: '#',
      width: 60,
      minWidth: 60,
      flex: 0.1,
      resizable: false,
      filterable: false,
      sortable: false,
    },
    {
      field: 'timestamp',
      headerName: 'Time',
      minWidth: 160,
      flex: 0.5,
      resizable: false,
      valueFormatter: (params: GridValueFormatterParams) => {
        const valueFormatted = new Date(params.value as string);
        return format(valueFormatted, 'yy / MM / dd HH:mm');
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
    setPage(0);
    setDataRows(props.data);
  }, [props.data]);

  const onChangePage = (page: number) => {
    setPage(page);
  };
  const onChangePageSize = (size: number) => {
    props.onChangePageSize(size);
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
        checkboxSelection
        disableColumnMenu
        headerHeight={50}
        rowHeight={50}
        rowCount={props.logCount}
        disableSelectionOnClick
        disableColumnFilter
        autoHeight
        error={props.isError}
        rows={dataRows}
        columns={columns}
        onPageChange={onChangePage}
        onPageSizeChange={onChangePageSize}
        pageSize={props.pageSize}
        page={page}
        rowsPerPageOptions={[5, 20, 50, 100]}
        components={{
          Checkbox: cbProps => <SimpleCheckbox indeterminate={cbProps.indeterminate} isChecked={cbProps.checked} toggleCheckboxChange={cbProps.onChange} />,
        }}
      />
    </>
  );
};

export default React.memo(Table);
