export enum DashboardSitesViewTab {
  Map = 'map',
  List = 'list',
}

export interface Device {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly ownerId: string;
  readonly regionCode: string;
  readonly city_name: string;
  readonly lat: number;
  readonly lon: number;
}

export interface OnPremDevicesResponse {
  readonly totalCount: number;
  readonly devices: Device[];
}
