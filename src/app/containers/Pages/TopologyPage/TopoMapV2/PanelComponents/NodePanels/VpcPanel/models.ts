export interface IExpandState {
  expand: boolean;
  id: string;
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
    id: 'netLoadBalancer',
  },
  appLoadBalancer: {
    expand: false,
    id: 'appLoadBalancer',
  },
  vms: {
    expand: false,
    id: 'vms',
  },
  internetGatAway: {
    expand: false,
    id: 'internetGatAway',
  },
};
