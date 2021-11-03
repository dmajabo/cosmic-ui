import { cloudIcon, deviceIcon } from 'app/components/SVGIcons/settingsIcons/inventoryToogleIcons';
import { IGridColumnField, ISelectedListItem } from 'lib/models/general';

export enum InventoryOptions {
  DEVICE = 'device',
  CLOUD = 'cloud',
}
export const InventoryToogleOptions: ISelectedListItem<InventoryOptions>[] = [
  { id: InventoryOptions.DEVICE, label: 'Device', value: InventoryOptions.DEVICE, icon: deviceIcon },
  { id: InventoryOptions.CLOUD, label: 'Cloud', value: InventoryOptions.CLOUD, icon: cloudIcon },
];

export interface IInventoryDeviceGridColumns {
  name: IGridColumnField;
  account: IGridColumnField;
  network: IGridColumnField;
  status: IGridColumnField;
}

export const InventoryDeviceGridColumns: IInventoryDeviceGridColumns = {
  name: {
    resField: 'name',
    label: 'Name',
  },
  account: {
    resField: 'account',
    label: 'Account',
  },
  network: {
    resField: 'network',
    label: 'Network',
  },
  status: {
    resField: 'status',
    label: 'Status',
  },
};

export interface IInventoryCloudGridColumns {
  provider: IGridColumnField;
  account: IGridColumnField;
  region: IGridColumnField;
  status: IGridColumnField;
}

export const InventoryCloudGridColumns: IInventoryCloudGridColumns = {
  provider: {
    resField: 'provider',
    label: 'Provider',
  },
  account: {
    resField: 'account',
    label: 'Account',
  },
  region: {
    resField: 'region',
    label: 'Region',
  },
  status: {
    resField: 'status',
    label: 'Status',
  },
};
