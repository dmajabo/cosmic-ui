export interface IExpandState {
  expand: boolean;
  id: string;
}
export interface IVnetFields {
  netLoadBalancer: IExpandState;
  appLoadBalancer: IExpandState;
}
export const DEFAULT_WEB_ACL_EXPAND_FIELDS: IVnetFields = {
  netLoadBalancer: {
    expand: false,
    id: 'netLoadBalancer',
  },
  appLoadBalancer: {
    expand: false,
    id: 'appLoadBalancer',
  },
};
