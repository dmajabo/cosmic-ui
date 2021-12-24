import { IBaseEntity, ICollapsed, ICoord, ISize, IVisible } from 'lib/models/general';

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
}

export interface ITopologyPreparedMapDataV2 {
  nodes: ITopoNode<any>[];
  links: any[];
}
