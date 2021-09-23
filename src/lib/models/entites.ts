import branchNetworksIcon from 'app/images/svg/icons/branchNetworksIcon.svg';
import applicationIconIcon from 'app/images/svg/icons/applicationIcon.svg';
import tgwIconIcon from 'app/images/svg/icons/tgwIcon.svg';
import vpnAttachedIconIcon from 'app/images/svg/icons/vpnAttachedIcon.svg';
import { TOPOLOGY_NODE_TYPES } from './topology';

export interface IEntity {
  id: TOPOLOGY_NODE_TYPES;
  selected: boolean;
  icon: JSX.Element | string;
  type: TOPOLOGY_NODE_TYPES;
  label: string;
  disabled: boolean;
}

export const EntityTypes: IEntity[] = [
  { id: TOPOLOGY_NODE_TYPES.NETWORK_GROUP, type: TOPOLOGY_NODE_TYPES.DEVICE, selected: true, icon: branchNetworksIcon, label: 'Branch Network', disabled: false },
  { id: TOPOLOGY_NODE_TYPES.ORGANIZATION, type: TOPOLOGY_NODE_TYPES.VNET, selected: true, icon: applicationIconIcon, label: 'Application', disabled: false },
  { id: TOPOLOGY_NODE_TYPES.WEDGE, type: TOPOLOGY_NODE_TYPES.WEDGE, selected: true, icon: tgwIconIcon, label: 'TGW', disabled: false },
  { id: TOPOLOGY_NODE_TYPES.VNET, type: TOPOLOGY_NODE_TYPES.VNET, selected: true, icon: vpnAttachedIconIcon, label: 'VPN Attachment', disabled: false },
];
