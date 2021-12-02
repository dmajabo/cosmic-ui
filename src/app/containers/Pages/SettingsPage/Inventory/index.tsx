import React from 'react';
import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { ISelectedListItem } from 'lib/models/general';
import Header from '../Components/Header';
import { InventoryOptions, InventoryToogleOptions } from './model';
// import SettingsButton from 'app/components/Buttons/SettingsButton';
// import PopupItem from 'app/components/Buttons/SettingsButton/PopupItem';
// import { PopupContent } from 'app/components/Buttons/SettingsButton/PopupItemStyles';
// import { GridCellWrapper } from 'app/components/Grid/styles';
// import { deleteIcon } from 'app/components/SVGIcons/delete';
import InventoryDevices from './InventoryDevices';
import InventoryCloud from './InventoryCloud';

interface IProps {}

const Inventory: React.FC<IProps> = (props: IProps) => {
  const [selectedOption, setSelectedOptions] = React.useState<ISelectedListItem<InventoryOptions>>(InventoryToogleOptions[0]);
  const [searchValue, setSearchValue] = React.useState<string>(null);
  // const [cloudSelectionModel, setCloudSelectionModel] = React.useState<GridSelectionModel>([]);
  // const [deviceSelectionModel, setDeviceSelectionModel] = React.useState<GridSelectionModel>([]);
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
      valueFormatter: (params: GridValueFormatterParams) => {
        return +params.value + 1;
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 240,
      width: 240,
      flex: 0.25,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      field: 'serial',
      headerName: 'Serial',
      width: 200,
      minWidth: 200,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      field: 'model',
      headerName: 'Model',
      minWidth: 120,
      width: 120,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      field: 'networkId',
      headerName: 'Network ID',
      minWidth: 240,
      width: 200,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      field: 'hostname',
      headerName: 'Network Name',
      minWidth: 240,
      flex: 0.5,
      resizable: false,
      disableColumnMenu: true,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      field: 'publicIp',
      headerName: 'Public IP',
      minWidth: 200,
      width: 200,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      field: 'privateIp',
      headerName: 'Private IP',
      minWidth: 200,
      width: 200,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      minWidth: 200,
      width: 200,
      flex: 0.25,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
      hide: true,
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
      valueFormatter: (params: GridValueFormatterParams) => {
        return +params.value + 1;
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 200,
      width: 200,
      flex: 0.25,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      field: 'extId',
      headerName: 'Ext ID',
      minWidth: 240,
      width: 240,
      flex: 0.25,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      field: 'vnetkey',
      headerName: 'VNET Key',
      width: 200,
      minWidth: 200,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      minWidth: 200,
      width: 200,
      flex: 0.5,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
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

  // const onDelete = (param: GridRenderCellParams) => {
  //   console.log(param);
  // };

  const onMassDelete = () => {
    // setDeviceSelectionModel([]);
  };

  // const onSelectionModelChange = (e: GridSelectionModel, option: InventoryOptions) => {
  //   if (option === InventoryOptions.DEVICE) {
  //     setDeviceSelectionModel(e);
  //     return;
  //   }
  //   if (option === InventoryOptions.CLOUD) {
  //     setCloudSelectionModel(e);
  //     return;
  //   }
  // };

  const onToogleChange = (value: ISelectedListItem<InventoryOptions>) => {
    if (value.id === selectedOption.id) return;
    setSelectedOptions(value);
  };
  return (
    <>
      <Header
        // selectedItems={selectedOption.id === InventoryOptions.DEVICE ? deviceSelectionModel : cloudSelectionModel}
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
        hideDelete
      />
      {selectedOption.id === InventoryOptions.DEVICE && (
        <InventoryDevices
          searchValue={searchValue}
          columns={gridDeviceColumns}
          // selectedItems={deviceSelectionModel}
          // onSelectionModelChange={onSelectionModelChange}
        />
      )}
      {selectedOption.id === InventoryOptions.CLOUD && (
        <InventoryCloud
          searchValue={searchValue}
          columns={gridCloudColumns}
          // selectedItems={cloudSelectionModel}
          // onSelectionModelChange={onSelectionModelChange}
        />
      )}
    </>
  );
};

export default React.memo(Inventory);
