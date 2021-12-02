import { cloudIcon, deviceIcon } from 'app/components/SVGIcons/settingsIcons/inventoryToogleIcons';
import { ISelectedListItem } from 'lib/models/general';

export enum InventoryOptions {
  DEVICE = 'device',
  CLOUD = 'cloud',
}
export const InventoryToogleOptions: ISelectedListItem<InventoryOptions>[] = [
  { id: InventoryOptions.DEVICE, label: 'Device', value: InventoryOptions.DEVICE, icon: deviceIcon },
  { id: InventoryOptions.CLOUD, label: 'Cloud', value: InventoryOptions.CLOUD, icon: cloudIcon },
];
