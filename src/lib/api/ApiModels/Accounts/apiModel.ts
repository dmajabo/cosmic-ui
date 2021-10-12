export enum AccountTypes {
  AWS = 'aws',
  MERRAKI = 'meraki',
}

export enum AccountStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
}

export interface IAccount {
  id?: string;
  type: AccountTypes;
  name: string;
  status?: AccountStatus;
  description: string;
}
