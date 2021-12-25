import { INetworkVNetwork, INetworkwEdge } from 'lib/api/ApiModels/Topology/apiModels';
import { IBaseEntity, ICollapsed, ICoord, ISize, IVisible } from 'lib/models/general';
import { IMappedNode } from 'lib/models/topology';

export interface ITopoNode<T> extends ISize, ICoord, ICollapsed, IVisible, IBaseEntity<string> {
  name: string;
  uiId: string;
  orgId: string;
  type: TopoNodeTypes;
  children: T[];
}

export enum TopoNodeTypes {
  ACCOUNT = 'account',
  REGION = 'region',
  DATA_CENTER = 'data_center',
  SITES = 'sites',

  WEDGE = 'wedge',
  VNET = 'vnet',
}

export enum DirectionType {
  CENTER = 'center',
  TOP = 'top',
  BOTTOM = 'bottom',
}

export interface INetworkVNetNode extends INetworkVNetwork, IMappedNode, ICoord {}

export interface ITGWNode extends INetworkwEdge, IMappedNode, ICoord {}

export const VPCS_IN_ROW = 12;

export interface ITopologyPreparedMapDataV2 {
  nodes: ITopoNode<any>[];
  links: any[];
}
