import { IBaseEntity, ICollapsed, ICoord, IVisible } from 'lib/models/general';

export interface ITopoNode extends ICoord, ICollapsed, IVisible, IBaseEntity<string> {
  name: string;
  uiId: string;
  orgId: string;
  type: TopoNodeTypes;
}

export enum TopoNodeTypes {
  ACCOUNT = 'account',
  REGION = 'region',
  DATA_CENTER = 'data_center',
  SITES = 'sites',
}

export interface ITopologyPreparedMapDataV2 {
  nodes: ITopoNode[];
  links: any[];
}
