import React from 'react';
import { GridColDef, DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import { GridStyles } from 'app/components/Grid/GridStyles';
import Paging from 'app/components/Basic/Paging';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { gridAscArrow, gridDescArrow } from 'app/components/SVGIcons/arrows';

interface Props {
  pageSize: number;
  currentPage: number;
  columns: GridColDef[];
  selectionModel: GridSelectionModel;
  onChangePage: (page: number) => void;
  selectionModalChange: (e: any) => void;
  onChangePageSize: (_size: number, _page?: number) => void;
}

const InventoryDevices: React.FC<Props> = (props: Props) => {
  const [dataRows] = React.useState<any[]>([
    {
      id: '0',
      rowIndex: 0,
      name: 'US Easy new',
      account: 'Okulis-Cisco-Meraki',
      network: 'Network name',
      status: 'Active',
    },
    {
      id: '1',
      rowIndex: 1,
      name: 'US Easy new 2',
      account: 'Okulis-Cisco-Meraki-Prod',
      network: 'Network name',
      status: 'Active',
    },
  ]);
  const gridStyles = GridStyles();

  const onSelectionModelChange = e => {
    props.selectionModalChange(e);
  };

  const onChangePage = (page: number) => {
    props.onChangePage(page);
  };
  const onChangePageSize = (size: number, page?: number) => {
    props.onChangePageSize(size, page);
  };

  return (
    <>
      <DataGrid
        className={gridStyles.borderedRow}
        disableColumnMenu
        hideFooter
        headerHeight={50}
        rowHeight={50}
        rowCount={dataRows.length}
        disableColumnFilter
        autoHeight
        // error={props.isError}
        rows={dataRows}
        columns={props.columns}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={onSelectionModelChange}
        selectionModel={props.selectionModel}
        components={{
          ColumnUnsortedIcon: () => null,
          ColumnSortedAscendingIcon: () => <>{gridAscArrow}</>,
          ColumnSortedDescendingIcon: () => <>{gridDescArrow}</>,
          Checkbox: ({ checked, onChange, indeterminate }) => <SimpleCheckbox isChecked={checked} toggleCheckboxChange={onChange} indeterminate={indeterminate} />,
        }}
        pageSize={dataRows ? dataRows.length : 0}
      />
      <Paging count={dataRows.length} disabled={!dataRows.length} pageSize={props.pageSize} currentPage={props.currentPage} onChangePage={onChangePage} onChangePageSize={onChangePageSize} />
    </>
  );
};

export default React.memo(InventoryDevices);
