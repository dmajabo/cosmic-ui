import React from 'react';
import { useSettingsDataContext } from 'lib/hooks/Settings/useSettingsDataContenxt';
import { DataGrid, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import Header from './Header';
import { GridStyles } from 'app/components/Grid/GridStyles';
import { SettingsGridColumns } from './model';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { settingsDotsIcon } from 'app/components/SVGIcons/settingsDots';
import Drawer from '@mui/material/Drawer';
import EditFormComponent from './FormComponent/EditFormComponent';
interface IProps {}

const AdminPage: React.FC<IProps> = (props: IProps) => {
  const { settings } = useSettingsDataContext();
  const [searchValue, setSearchValue] = React.useState<string>(null);
  const [userItem, setUserItem] = React.useState<any>(null);
  const [showEditForm, setShowEditForm] = React.useState<boolean>(false);
  const [gridColumns, setGridColumns] = React.useState<GridColDef[]>([
    {
      field: 'rowIndex',
      headerName: '#',
      minWidth: 70,
      flex: 0,
      resizable: false,
      valueFormatter: (params: GridValueFormatterParams) => +params.value + 1,
    },
    {
      field: SettingsGridColumns.name.resField,
      headerName: SettingsGridColumns.name.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
    },
    { field: SettingsGridColumns.type.resField, headerName: SettingsGridColumns.type.label, minWidth: 200, flex: 0.5, resizable: false },
    { field: SettingsGridColumns.profile.resField, headerName: SettingsGridColumns.profile.label, minWidth: 200, flex: 0.5, resizable: false },
    { field: SettingsGridColumns.apiAccess.resField, headerName: SettingsGridColumns.apiAccess.label, minWidth: 200, flex: 0.5, resizable: false },
    { field: SettingsGridColumns.adoms.resField, headerName: SettingsGridColumns.adoms.label, minWidth: 200, flex: 0.5, resizable: false },
    { field: SettingsGridColumns.ipvHost.resField, headerName: SettingsGridColumns.ipvHost.label, minWidth: 200, flex: 0.5, resizable: false },
    {
      field: '',
      headerName: '',
      width: 40,
      resizable: false,
      filterable: false,
      sortable: false,
      editable: false,
      hideSortIcons: true,
      disableColumnMenu: true,
      disableReorder: true,
      disableExport: true,
      renderCell: () => <IconWrapper icon={settingsDotsIcon} />,
    },
  ]);
  const gridStyles = GridStyles();
  const onSearhChange = (value: string) => {
    setSearchValue(value);
  };

  const onToogleAdminForm = () => {
    setShowEditForm(prev => !prev);
  };

  const onChangeColumn = (col: GridColDef) => {
    const _items: GridColDef[] = gridColumns.slice();
    const _index = _items.findIndex(it => it.field === col.field);
    _items[_index].hide = !col.hide;
    setGridColumns(_items);
  };

  return (
    <>
      <Header searchValue={searchValue} columns={gridColumns} onChangeColumn={onChangeColumn} onSearchChange={onSearhChange} onToogleEditForm={onToogleAdminForm} />

      <DataGrid
        className={gridStyles.borderedRow}
        disableColumnMenu
        hideFooter
        headerHeight={50}
        rowHeight={50}
        rowCount={0}
        // onRowClick={onRowGetSelection}
        disableColumnFilter
        autoHeight
        // error={props.isError}
        rows={[
          {
            id: '0',
            rowIndex: 0,
            name: 'Admin',
            type: 'admin',
            profile: 'Super_User',
            apiAccess: 'Read & Write',
            adoms: 'All Adoms',
            ipvHost: '0.0.0.0/0.0.0.0',
          },
        ]}
        columns={gridColumns}
        // pageSize={dataRows ? dataRows.length : 0}
        // components={{
        //   ColumnUnsortedIcon: () => null,
        //   ColumnSortedAscendingIcon: () => <>{gridAscArrow}</>,
        //   ColumnSortedDescendingIcon: () => <>{gridDescArrow}</>,
        // }}
      />
      {/* <Paging
        count={props.logCount}
        disabled={!dataRows.length || props.logCount === 0}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onChangePage={onChangePage}
        onChangePageSize={onChangePageSize}
      /> */}
      <Drawer transitionDuration={300} anchor="right" open={showEditForm} onClose={onToogleAdminForm}>
        <EditFormComponent dataItem={userItem} />
      </Drawer>
    </>
  );
};

export default React.memo(AdminPage);
