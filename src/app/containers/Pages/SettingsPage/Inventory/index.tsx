import React from 'react';
import { GridValueFormatterParams } from '@mui/x-data-grid';
import { ISelectedListItem } from 'lib/models/general';
import Header from '../Components/Header';
import { InventoryCloudGridColumns, InventoryDeviceGridColumns, InventoryOptions, InventoryToogleOptions } from './model';
// import SettingsButton from 'app/components/Buttons/SettingsButton';
// import PopupItem from 'app/components/Buttons/SettingsButton/PopupItem';
// import { PopupContent } from 'app/components/Buttons/SettingsButton/PopupItemStyles';
// import { GridCellWrapper } from 'app/components/Grid/styles';
// import { deleteIcon } from 'app/components/SVGIcons/delete';
import InventoryDevices from './InventoryDevices';
import InventoryCloud from './InventoryCloud';
import { IColumn } from 'lib/models/grid';

interface IProps {}

const Inventory: React.FC<IProps> = (props: IProps) => {
  const [selectedOption, setSelectedOptions] = React.useState<ISelectedListItem<InventoryOptions>>(InventoryToogleOptions[0]);
  const [searchValue, setSearchValue] = React.useState<string>(null);
  const [gridDeviceColumns, setGridDeviceColumns] = React.useState<IColumn[]>([
    {
      id: 'inventoryDeviceRowIndex',
      field: 'rowIndex',
      headerName: '#',
      label: '',
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
      id: `inventoryDevice${InventoryDeviceGridColumns.name.resField}`,
      field: InventoryDeviceGridColumns.name.resField,
      headerName: InventoryDeviceGridColumns.name.label,
      label: InventoryDeviceGridColumns.name.label,
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
      id: `inventoryDevice${InventoryDeviceGridColumns.serial.resField}`,
      field: InventoryDeviceGridColumns.serial.resField,
      headerName: InventoryDeviceGridColumns.serial.label,
      label: InventoryDeviceGridColumns.serial.label,
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
      id: `inventoryDevice${InventoryDeviceGridColumns.model.resField}`,
      field: InventoryDeviceGridColumns.model.resField,
      headerName: InventoryDeviceGridColumns.model.label,
      label: InventoryDeviceGridColumns.model.label,
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
      id: `inventoryDevice${InventoryDeviceGridColumns.networkId.resField}`,
      field: InventoryDeviceGridColumns.networkId.resField,
      headerName: InventoryDeviceGridColumns.networkId.label,
      label: InventoryDeviceGridColumns.networkId.label,
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
      id: `inventoryDevice${InventoryDeviceGridColumns.hostname.resField}`,
      field: InventoryDeviceGridColumns.hostname.resField,
      headerName: InventoryDeviceGridColumns.hostname.label,
      label: InventoryDeviceGridColumns.hostname.label,
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
      id: `inventoryDevice${InventoryDeviceGridColumns.publicIp.resField}`,
      field: InventoryDeviceGridColumns.publicIp.resField,
      headerName: InventoryDeviceGridColumns.publicIp.label,
      label: InventoryDeviceGridColumns.publicIp.label,
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
      id: `inventoryDevice${InventoryDeviceGridColumns.privateIp.resField}`,
      field: InventoryDeviceGridColumns.privateIp.resField,
      headerName: InventoryDeviceGridColumns.privateIp.label,
      label: InventoryDeviceGridColumns.privateIp.label,
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
      id: `inventoryDevice${InventoryDeviceGridColumns.description.resField}`,
      field: InventoryDeviceGridColumns.description.resField,
      headerName: InventoryDeviceGridColumns.description.label,
      label: InventoryDeviceGridColumns.description.label,
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
  const [gridCloudColumns, setGridCloudColumns] = React.useState<IColumn[]>([
    {
      id: 'inventoryCloudRowIndex',
      field: 'rowIndex',
      headerName: '#',
      label: '',
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
      id: `inventoryCloud${InventoryCloudGridColumns.name.resField}`,
      field: InventoryCloudGridColumns.name.resField,
      headerName: InventoryCloudGridColumns.name.label,
      label: InventoryCloudGridColumns.name.label,
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
      id: `inventoryCloud${InventoryCloudGridColumns.extId.resField}`,
      field: InventoryCloudGridColumns.extId.resField,
      headerName: InventoryCloudGridColumns.extId.label,
      label: InventoryCloudGridColumns.extId.label,
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
      id: `inventoryCloud${InventoryCloudGridColumns.vnetkey.resField}`,
      field: InventoryCloudGridColumns.vnetkey.resField,
      headerName: InventoryCloudGridColumns.vnetkey.label,
      label: InventoryCloudGridColumns.vnetkey.label,
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
      id: `inventoryCloud${InventoryCloudGridColumns.description.resField}`,
      field: InventoryCloudGridColumns.description.resField,
      headerName: InventoryCloudGridColumns.description.label,
      label: InventoryCloudGridColumns.description.label,
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

  const onChangeColumn = (col: IColumn) => {
    if (selectedOption.id === InventoryOptions.DEVICE) {
      const _items: IColumn[] = gridDeviceColumns.slice();
      const _index = _items.findIndex(it => it.field === col.field);
      _items[_index].hide = !col.hide;
      setGridDeviceColumns(_items);
      return;
    }
    if (selectedOption.id === InventoryOptions.CLOUD) {
      const _items: IColumn[] = gridCloudColumns.slice();
      const _index = _items.findIndex(it => it.field === col.field);
      _items[_index].hide = !col.hide;
      setGridCloudColumns(_items);
    }
  };

  const onChangeOrder = (_items: IColumn[]) => {
    if (selectedOption.id === InventoryOptions.DEVICE) {
      setGridDeviceColumns(_items);
      return;
    }
    if (selectedOption.id === InventoryOptions.CLOUD) {
      setGridCloudColumns(_items);
    }
  };

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
        onChangeColumn={onChangeColumn}
        onChangeOrder={onChangeOrder}
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
