import React from 'react';
import { GridSelectionModel, GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import { ISelectedListItem } from 'lib/models/general';
import Header from '../Components/Header';
import { useSettingsDataContext } from 'lib/hooks/Settings/useSettingsDataContenxt';
import { InventoryCloudGridColumns, InventoryDeviceGridColumns, InventoryOptions, InventoryToogleOptions } from './model';
import SettingsButton from 'app/components/Buttons/SettingsButton';
import PopupItem from 'app/components/Buttons/SettingsButton/PopupItem';
import { PopupContent } from 'app/components/Buttons/SettingsButton/PopupItemStyles';
import { GridCellWrapper } from 'app/components/Grid/styles';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import InventoryDevices from './InventoryDevices';
import InventoryCloud from './InventoryCloud';
import { SettingsTabTypes } from 'lib/hooks/Settings/model';

interface IProps {}

const Inventory: React.FC<IProps> = (props: IProps) => {
  const { settings } = useSettingsDataContext();
  const [deviceSelectionModel, setDeviceSelectionModel] = React.useState<GridSelectionModel>([]);
  const [cloudSelectionModel, setCloudSelectionModel] = React.useState<GridSelectionModel>([]);
  const [selectedOption, setSelectedOptions] = React.useState<ISelectedListItem<InventoryOptions>>(InventoryToogleOptions[0]);
  const [searchValue, setSearchValue] = React.useState<string>(null);
  // const [showDetails, setDetailsForm] = React.useState<IModal<any>>(null);
  const [gridDeviceColumns, setGridDeviceColumns] = React.useState<GridColDef[]>([
    {
      field: 'rowIndex',
      headerName: '#',
      minWidth: 70,
      flex: 0,
      resizable: false,
      filterable: false,
      sortable: false,
      editable: false,
      hideSortIcons: true,
      disableColumnMenu: true,
      disableReorder: true,
      disableExport: true,
      valueFormatter: (params: GridValueFormatterParams) => +params.value + 1,
    },
    {
      field: InventoryDeviceGridColumns.name.resField,
      headerName: InventoryDeviceGridColumns.name.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
      // renderCell: (param: GridRenderCellParams) => (
      //   <GridCellWrapper>
      //     <GridCellLabel color="var(--_sHoverButtonColor)" onClick={() => onEditUser(param)}>
      //       {param.value}
      //     </GridCellLabel>
      //   </GridCellWrapper>
      // ),
    },
    { field: InventoryDeviceGridColumns.account.resField, headerName: InventoryDeviceGridColumns.account.label, minWidth: 200, flex: 0.5, resizable: false },
    {
      field: InventoryDeviceGridColumns.network.resField,
      headerName: InventoryDeviceGridColumns.network.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
      // renderCell: (param: any) => (
      //   <GridCellWrapper>
      //     <GridCellLabel color="var(--_sHoverButtonColor)" onClick={() => onEditProfile(param)}>
      //       {param.value ? param.value : null}
      //     </GridCellLabel>
      //   </GridCellWrapper>
      // ),
    },
    { field: InventoryDeviceGridColumns.status.resField, headerName: InventoryDeviceGridColumns.status.label, minWidth: 200, flex: 0.5, resizable: false },
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
              <PopupItem color="var(--_errorColor)" label="Delete" icon={deleteIcon()} onClick={() => onDelete(param)} />
            </PopupContent>
          </SettingsButton>
        </GridCellWrapper>
      ),
    },
  ]);

  const [gridCloudColumns, setGridCloudColumns] = React.useState<GridColDef[]>([
    {
      field: 'rowIndex',
      headerName: '#',
      minWidth: 70,
      flex: 0,
      resizable: false,
      filterable: false,
      sortable: false,
      editable: false,
      hideSortIcons: true,
      disableColumnMenu: true,
      disableReorder: true,
      disableExport: true,
      valueFormatter: (params: GridValueFormatterParams) => +params.value + 1,
    },
    {
      field: InventoryCloudGridColumns.provider.resField,
      headerName: InventoryCloudGridColumns.provider.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
      // renderCell: (param: GridRenderCellParams) => (
      //   <GridCellWrapper>
      //     <GridCellLabel color="var(--_sHoverButtonColor)" onClick={() => onEditUser(param)}>
      //       {param.value}
      //     </GridCellLabel>
      //   </GridCellWrapper>
      // ),
    },
    { field: InventoryCloudGridColumns.account.resField, headerName: InventoryCloudGridColumns.account.label, minWidth: 200, flex: 0.5, resizable: false },
    {
      field: InventoryCloudGridColumns.region.resField,
      headerName: InventoryCloudGridColumns.region.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
      // renderCell: (param: any) => (
      //   <GridCellWrapper>
      //     <GridCellLabel color="var(--_sHoverButtonColor)" onClick={() => onEditProfile(param)}>
      //       {param.value ? param.value : null}
      //     </GridCellLabel>
      //   </GridCellWrapper>
      // ),
    },
    { field: InventoryCloudGridColumns.status.resField, headerName: InventoryCloudGridColumns.status.label, minWidth: 200, flex: 0.5, resizable: false },
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
              <PopupItem color="var(--_errorColor)" label="Delete" icon={deleteIcon()} onClick={() => onDelete(param)} />
            </PopupContent>
          </SettingsButton>
        </GridCellWrapper>
      ),
    },
  ]);

  const onSearhChange = (value: string) => {
    setSearchValue(value);
  };

  const onChangeColumn = (col: GridColDef) => {
    if (selectedOption.id === InventoryOptions.DEVICE) {
      const _items: GridColDef[] = gridDeviceColumns.slice();
      const _index = _items.findIndex(it => it.field === col.field);
      _items[_index].hide = !col.hide;
      setGridDeviceColumns(_items);
      return;
    }
    if (selectedOption.id === InventoryOptions.CLOUD) {
      const _items: GridColDef[] = gridCloudColumns.slice();
      const _index = _items.findIndex(it => it.field === col.field);
      _items[_index].hide = !col.hide;
      setGridCloudColumns(_items);
    }
  };

  // const onOpenDetails = (item: any) => {
  //   setDetailsForm({ show: true, dataItem: item });
  // };

  // const onCloseDetails = () => {
  //   setDetailsForm(null);
  // };

  const onDelete = (param: GridRenderCellParams) => {
    console.log(param);
  };

  const onMassDelete = () => {
    setDeviceSelectionModel([]);
  };

  const onSelectionModelChange = e => {
    if (selectedOption.id === InventoryOptions.DEVICE) {
      setDeviceSelectionModel(e);
      return;
    }
    if (selectedOption.id === InventoryOptions.CLOUD) {
      setCloudSelectionModel(e);
      return;
    }
  };

  const onChangePage = (page: number) => {
    settings.onChangeCurrentPage(SettingsTabTypes.Inventory, page, selectedOption.id as InventoryOptions);
  };
  const onChangePageSize = (size: number, page?: number) => {
    settings.onChangePageSize(SettingsTabTypes.Inventory, size, page, selectedOption.id as InventoryOptions);
  };

  const onToogleChange = (value: ISelectedListItem<InventoryOptions>) => {
    if (value.id === selectedOption.id) return;
    setSelectedOptions(value);
  };
  return (
    <>
      <Header
        selectedItems={selectedOption.id === InventoryOptions.DEVICE ? deviceSelectionModel : cloudSelectionModel}
        searchValue={searchValue}
        columns={selectedOption.id === InventoryOptions.DEVICE ? gridDeviceColumns : gridCloudColumns}
        onMassDelete={onMassDelete}
        onChangeColumn={onChangeColumn}
        onSearchChange={onSearhChange}
        hideEditButton
        selectedToogleOption={selectedOption}
        toggleOptions={InventoryToogleOptions}
        onToogleChange={onToogleChange}
        showToogle
      />
      {selectedOption.id === InventoryOptions.DEVICE && (
        <InventoryDevices
          pageSize={settings.inventoryDevicePageSize}
          currentPage={settings.inventoryDeviceCurrentPage}
          columns={gridDeviceColumns}
          selectionModel={deviceSelectionModel}
          onChangePage={onChangePage}
          selectionModalChange={onSelectionModelChange}
          onChangePageSize={onChangePageSize}
        />
      )}
      {selectedOption.id === InventoryOptions.CLOUD && (
        <InventoryCloud
          pageSize={settings.inventoryCloudPageSize}
          currentPage={settings.inventoryCloudCurrentPage}
          columns={gridCloudColumns}
          selectionModel={cloudSelectionModel}
          onChangePage={onChangePage}
          selectionModalChange={onSelectionModelChange}
          onChangePageSize={onChangePageSize}
        />
      )}
    </>
  );
};

export default React.memo(Inventory);
