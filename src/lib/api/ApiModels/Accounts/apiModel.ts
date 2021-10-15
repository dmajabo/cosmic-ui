export enum AccountVendorTypes {
  AMAZON_AWS = 'AMAZON_AWS',
  CISCO_MERAKI = 'CISCO_MERAKI',
}

export enum AccountStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
}

export interface IAccount {
  id?: string;
  vendor: AccountVendorTypes;
  name: string;
  description: string;
  status?: AccountStatus;
  // email: string;
  // password: string;
}

export interface IMerakiFlowLogPolicy {
  enableSyslog: boolean;
}

export interface IMerakiPolicy {
  apiKey: string;
  flowlogPol: IMerakiFlowLogPolicy;
}

export interface IAwsFlowLogPolicy {
  enable: boolean;
}

export interface IAwsPolicy {
  username: string;
  accessKey: string;
  secret: string;
  regions: string[];
  flowlogPol: IAwsFlowLogPolicy;
}

export interface IMeraki_Account extends IAccount {
  merakiPol: IMerakiPolicy;
}

export interface IAWS_Account extends IAccount {
  awsPol: IAwsPolicy;
}

export interface IAccountsRes {
  controllers: (IMeraki_Account | IAWS_Account)[];
}
