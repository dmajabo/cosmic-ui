import { cloudIcon, deviceIcon } from 'app/components/SVGIcons/settingsIcons/inventoryToogleIcons';
import { ISelectedListItem } from 'lib/models/general';
import { IGridColumnField } from 'lib/models/grid';

export enum InventoryOptions {
  DEVICE = 'device',
  CLOUD = 'cloud',
}
export const InventoryToogleOptions: ISelectedListItem<InventoryOptions>[] = [
  { id: InventoryOptions.DEVICE, label: 'Device', value: InventoryOptions.DEVICE, icon: deviceIcon },
  { id: InventoryOptions.CLOUD, label: 'Cloud', value: InventoryOptions.CLOUD, icon: cloudIcon },
];

export interface IInventoryDeviceGridColumns {
  extId: IGridColumnField;
  name: IGridColumnField;
  serial: IGridColumnField;
  model: IGridColumnField;
  networkId: IGridColumnField;
  hostname: IGridColumnField;
  publicIp: IGridColumnField;
  privateIp: IGridColumnField;
  description: IGridColumnField;
}

export const InventoryDeviceGridColumns: IInventoryDeviceGridColumns = {
  extId: {
    resField: 'extId',
    label: 'extId',
  },
  name: {
    resField: 'name',
    label: 'Name',
  },
  serial: {
    resField: 'serial',
    label: 'Serial',
  },
  model: {
    resField: 'model',
    label: 'Model',
  },
  networkId: {
    resField: 'networkId',
    label: 'Network ID',
  },
  hostname: {
    resField: 'hostname',
    label: 'Network Name',
  },
  publicIp: {
    resField: 'publicIp',
    label: 'Public IP',
  },
  privateIp: {
    resField: 'privateIp',
    label: 'Private IP',
  },
  description: {
    resField: 'description',
    label: 'Description',
  },
};

export interface IInventoryCloudGridColumns {
  name: IGridColumnField;
  extId: IGridColumnField;
  vnetkey: IGridColumnField;
  description: IGridColumnField;
}

export const InventoryCloudGridColumns: IInventoryCloudGridColumns = {
  name: {
    resField: 'name',
    label: 'Name',
  },
  extId: {
    resField: 'extId',
    label: 'Ext ID',
  },
  vnetkey: {
    resField: 'vnetkey',
    label: 'VNET Key',
  },
  description: {
    resField: 'description',
    label: 'Description',
  },
};
