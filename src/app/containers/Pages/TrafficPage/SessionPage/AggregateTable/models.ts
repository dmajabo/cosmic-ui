import { INetworkSession } from 'lib/api/ApiModels/Sessions/apiModel';

export interface IState {
  icon: any;
  label: string;
}

export interface IGroupedData {
  [key: string]: INetworkSession[];
}

export interface IAggregateRow {
  session: INetworkSession;
  data: IGroupedData;
  vendors: IState[];
}
