import branchNetworksIcon from 'app/images/svg/icons/branchNetworksIcon.svg';
import applicationIconIcon from 'app/images/svg/icons/applicationIcon.svg';
import tgwIconIcon from 'app/images/svg/icons/tgwIcon.svg';
import vpnAttachedIconIcon from 'app/images/svg/icons/vpnAttachedIcon.svg';
import { ENTITY_NODE_TYPES, TOPOLOGY_NODE_TYPES, TOPOLOGY_LINKS_TYPES } from './topology';

export interface IEntity {
  id: ENTITY_NODE_TYPES;
  selected: boolean;
  icon: JSX.Element | string;
  types: (TOPOLOGY_NODE_TYPES | TOPOLOGY_LINKS_TYPES)[];
  label: string;
  disabled: boolean;
}

export const EntityTypes: IEntity[] = [
  { id: ENTITY_NODE_TYPES.BRANCHES, types: [TOPOLOGY_NODE_TYPES.DEVICE, TOPOLOGY_NODE_TYPES.NETWORK_GROUP], selected: true, icon: branchNetworksIcon, label: 'Branch Network', disabled: false },
  { id: ENTITY_NODE_TYPES.VNETS, types: [TOPOLOGY_NODE_TYPES.VNET], selected: true, icon: applicationIconIcon, label: 'Application', disabled: false },
  { id: ENTITY_NODE_TYPES.WEDGES, types: [TOPOLOGY_NODE_TYPES.WEDGE], selected: true, icon: tgwIconIcon, label: 'TGW', disabled: false },
  { id: ENTITY_NODE_TYPES.VPNS, types: [TOPOLOGY_LINKS_TYPES.NETWORK_BRENCH_LINK], selected: true, icon: vpnAttachedIconIcon, label: 'VPN Attachment', disabled: false },
];
