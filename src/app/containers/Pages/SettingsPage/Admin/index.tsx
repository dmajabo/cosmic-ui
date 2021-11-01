import React from 'react';
import { useSettingsDataContext } from 'lib/hooks/Settings/useSettingsDataContenxt';
import { DataGrid, GridCellParams, GridColDef, GridRenderCellParams, GridSelectionModel, GridValueFormatterParams } from '@mui/x-data-grid';
import Header from './Header';
import { GridStyles } from 'app/components/Grid/GridStyles';
import { ACCESS_VALUES_TYPE, SettingsGridColumns } from './model';
import Drawer from '@mui/material/Drawer';
import EditFormComponent from './FormComponent/EditFormComponent';
import SettingsButton from 'app/components/Buttons/SettingsButton';
import { PopupContent } from 'app/components/Buttons/SettingsButton/PopupItemStyles';
import PopupItem from 'app/components/Buttons/SettingsButton/PopupItem';
import { editIcon } from 'app/components/SVGIcons/edit';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import EditProfileFormComponent from './FormComponent/EditProfileFormComponent';
import { GridCellWrapper, GridCellLabel } from 'app/components/Grid/styles';
import { IModal } from 'lib/models/general';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import Paging from 'app/components/Basic/Paging';
interface IProps {}

const AdminPage: React.FC<IProps> = (props: IProps) => {
  const { settings } = useSettingsDataContext();
  const [dataRows] = React.useState<any[]>([
    {
      id: '0',
      rowIndex: 0,
      name: 'Admin',
      type: 'admin',
      profile: {
        name: 'Super_User',
        description: '',
        permision: { dashboard: null, topology: null, network: null, performance_dashboard: null, sessions: null, automation: null, analytics: null, settings: null },
      },
      apiAccess: 'Read_Write',
      adoms: 'All Adoms',
      ipvHost: '0.0.0.0/0.0.0.0',
    },
    {
      id: '1',
      rowIndex: 1,
      name: 'User',
      type: 'user',
      profile: {
        name: 'Demo_User',
        description: '',
        permision: { dashboard: 'READ', topology: 'READ', network: 'READ', performance_dashboard: 'READ', sessions: 'READ', automation: 'NONE', analytics: null, settings: null },
      },
      apiAccess: 'Read',
      adoms: 'All Adoms',
      ipvHost: '0.0.0.0/0.0.0.0',
    },
  ]);
  const [searchValue, setSearchValue] = React.useState<string>(null);
  const [showEditForm, setShowEditForm] = React.useState<IModal<any>>(null);
  const [showEditProfileForm, setShowEditProfileForm] = React.useState<IModal<any>>(null);
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
      renderCell: (param: GridRenderCellParams) => (
        <GridCellWrapper>
          <GridCellLabel color="var(--_sHoverButtonColor)" onClick={() => onEditUser(param)}>
            {param.value}
          </GridCellLabel>
        </GridCellWrapper>
      ),
    },
    { field: SettingsGridColumns.type.resField, headerName: SettingsGridColumns.type.label, minWidth: 200, flex: 0.5, resizable: false },
    {
      field: SettingsGridColumns.profile.resField,
      headerName: SettingsGridColumns.profile.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
      renderCell: (param: any) => (
        <GridCellWrapper>
          <GridCellLabel color="var(--_sHoverButtonColor)" onClick={() => onEditProfile(param)}>
            {param.value ? param.value.name : null}
          </GridCellLabel>
        </GridCellWrapper>
      ),
    },
    {
      field: SettingsGridColumns.apiAccess.resField,
      headerName: SettingsGridColumns.apiAccess.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
      valueFormatter: (params: GridValueFormatterParams) => {
        if (!params.value) return null;
        if (params.value === ACCESS_VALUES_TYPE.READ_WRITE) return 'Read & Write';
        return params.value;
      },
    },
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
      renderCell: (param: GridRenderCellParams) => (
        <GridCellWrapper>
          <SettingsButton buttonStyles={{ position: 'static', width: '20px', height: '100%', margin: 'auto' }} id={param.id.toString()} hoverIconColor="var(--_sHoverButtonColor)">
            <PopupContent>
              <PopupItem label="Edit" icon={editIcon} onClick={() => onEditUser(param)} />
              <PopupItem color="var(--_errorColor)" label="Delete" icon={deleteIcon()} onClick={() => onDeleteUser(param)} />
            </PopupContent>
          </SettingsButton>
        </GridCellWrapper>
      ),
    },
  ]);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const gridStyles = GridStyles();

  const onSearhChange = (value: string) => {
    setSearchValue(value);
  };

  const onChangeColumn = (col: GridColDef) => {
    const _items: GridColDef[] = gridColumns.slice();
    const _index = _items.findIndex(it => it.field === col.field);
    _items[_index].hide = !col.hide;
    setGridColumns(_items);
  };

  const onCloseEditForm = () => {
    setShowEditForm(null);
  };

  const onCloseProfileForm = () => {
    setShowEditProfileForm(null);
  };

  const onEditProfile = (param: GridCellParams) => {
    setShowEditProfileForm({ show: true, dataItem: param.row.profile });
  };

  const onEditUser = (param?: GridRenderCellParams) => {
    const _item = param && param.row ? param.row : null;
    setShowEditForm({ show: true, dataItem: _item, isEditMode: !!(param && param.row) });
  };

  const onDeleteUser = (param: GridRenderCellParams) => {
    console.log(param);
  };

  const onMassDelete = () => {
    setSelectionModel([]);
  };

  const onSelectionModelChange = e => {
    setSelectionModel(e);
  };

  const onChangePage = (page: number) => {
    settings.onChangeCurrentPage(page);
  };
  const onChangePageSize = (size: number, page?: number) => {
    settings.onChangePageSize(size, page);
  };

  return (
    <>
      <Header
        selectedItems={selectionModel}
        searchValue={searchValue}
        columns={gridColumns}
        onMassDelete={onMassDelete}
        onChangeColumn={onChangeColumn}
        onSearchChange={onSearhChange}
        onToogleEditForm={onEditUser}
      />

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
        columns={gridColumns}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={onSelectionModelChange}
        selectionModel={selectionModel}
        components={{
          Checkbox: ({ checked, onChange, indeterminate }) => <SimpleCheckbox isChecked={checked} toggleCheckboxChange={onChange} indeterminate={indeterminate} />,
        }}
        pageSize={dataRows ? dataRows.length : 0}
        // components={{
        //   ColumnUnsortedIcon: () => null,
        //   ColumnSortedAscendingIcon: () => <>{gridAscArrow}</>,
        //   ColumnSortedDescendingIcon: () => <>{gridDescArrow}</>,
        // }}
      />
      <Paging
        count={dataRows.length}
        disabled={!dataRows.length}
        pageSize={settings.adminsPageSize}
        currentPage={settings.adminCurrentPage}
        onChangePage={onChangePage}
        onChangePageSize={onChangePageSize}
      />
      <Drawer transitionDuration={300} anchor="right" open={showEditForm && showEditForm.show ? true : false} onClose={onCloseEditForm}>
        <EditFormComponent isEdit={showEditForm && showEditForm.dataItem} dataItem={showEditForm && showEditForm.dataItem} onClose={onCloseEditForm} />
      </Drawer>
      <Drawer transitionDuration={300} anchor="right" open={showEditProfileForm && showEditProfileForm.show ? true : false} onClose={onCloseProfileForm}>
        <EditProfileFormComponent dataItem={showEditProfileForm && showEditProfileForm.dataItem} onClose={onCloseProfileForm} />
      </Drawer>
    </>
  );
};

export default React.memo(AdminPage);
