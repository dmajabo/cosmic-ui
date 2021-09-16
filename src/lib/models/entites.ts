import branchNetworksIcon from 'app/images/svg/icons/branchNetworksIcon.svg';
import applicationIconIcon from 'app/images/svg/icons/applicationIcon.svg';
import tgwIconIcon from 'app/images/svg/icons/tgwIcon.svg';
import vpnAttachedIconIcon from 'app/images/svg/icons/vpnAttachedIcon.svg';
import { TOPOLOGY_NODE_TYPES } from './topology';

export enum EntityTypesEnum {
  Branch_Networks = 'branch_networks',
  Application = 'application',
  TGW = 'tgw',
  VPN_Attachment = 'vpn_attachment',
}

export interface IEntity {
  id: EntityTypesEnum;
  selected: boolean;
  icon: JSX.Element | string;
  type: TOPOLOGY_NODE_TYPES;
  label: string;
  disabled: boolean;
}

export const EntityTypes: IEntity[] = [
  { id: EntityTypesEnum.Branch_Networks, type: TOPOLOGY_NODE_TYPES.DEVICE, selected: true, icon: branchNetworksIcon, label: 'Branch Network', disabled: false },
  { id: EntityTypesEnum.Application, type: TOPOLOGY_NODE_TYPES.VNET, selected: true, icon: applicationIconIcon, label: 'Application', disabled: false },
  { id: EntityTypesEnum.TGW, type: TOPOLOGY_NODE_TYPES.WEDGE, selected: true, icon: tgwIconIcon, label: 'TGW', disabled: false },
  { id: EntityTypesEnum.VPN_Attachment, type: TOPOLOGY_NODE_TYPES.VNET, selected: true, icon: vpnAttachedIconIcon, label: 'VPN Attachment', disabled: false },
];
