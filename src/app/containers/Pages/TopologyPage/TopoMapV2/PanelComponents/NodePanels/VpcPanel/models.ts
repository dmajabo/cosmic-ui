export enum ExpandStateVNETIds {
  NetLoadBalancer = 'netLoadBalancer',
  AppLoadBalancer = 'appLoadBalancer',
  Vms = 'vms',
  InternetGatAway = 'internetGatAway',
}

export interface IExpandState {
  expand: boolean;
  id: ExpandStateVNETIds;
}
export interface IVnetFields {
  netLoadBalancer: IExpandState;
  appLoadBalancer: IExpandState;
  vms: IExpandState;
  internetGatAway: IExpandState;
}
export const DEFAULT_VNET_EXPAND_FIELDS: IVnetFields = {
  netLoadBalancer: {
    expand: false,
    id: ExpandStateVNETIds.NetLoadBalancer,
  },
  appLoadBalancer: {
    expand: false,
    id: ExpandStateVNETIds.AppLoadBalancer,
  },
  vms: {
    expand: false,
    id: ExpandStateVNETIds.Vms,
  },
  internetGatAway: {
    expand: false,
    id: ExpandStateVNETIds.InternetGatAway,
  },
};
