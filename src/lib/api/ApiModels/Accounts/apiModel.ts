import { IBasePages, IBaseTotalCount } from 'lib/api/ApiModels/generalApiModel';

export enum AccountVendorTypes {
  AMAZON_AWS = 'AMAZON_AWS',
  CISCO_MERAKI = 'CISCO_MERAKI',
  PALO_ALTO = 'PALO_ALTO',
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
  enableNetflow?: boolean;
}

export interface IMerakiPolicy {
  apiKey: string;
  flowlogPol: IMerakiFlowLogPolicy;
}

export enum AwsLogStorageType {
  CLOUD_WATCH = 'CLOUD_WATCH',
  S3 = 'S3',
}

export enum ControllerAccessMode {
  READ_ONLY = 'READ_ONLY',
  READ_WRITE = 'READ_WRITE',
}

export interface IAwsFlowLogPolicy {
  enable: boolean;
  logStorageType: AwsLogStorageType;
  logGroupName: string;
  storageBucketName: string;
}

export interface IAwsPolicy {
  username: string;
  accessKey: string;
  secret: string;
  regions: string[];
  flowlogPol: IAwsFlowLogPolicy;
}

export interface IAzurePolicy {
  azureTenantId: string;
  azureClientId: string;
  azureClientSecret: string;
  azureSubscriptionId: string;
  azureEnvironment: string;
  azureAdResource: string;
}

export interface IMeraki_Account extends IAccount {
  merakiPol: IMerakiPolicy;
  accessMode: ControllerAccessMode;
}

export interface IAWS_Account extends IAccount {
  awsPol: IAwsPolicy;
}

export interface IAZURE_Account extends IAccount {
  azurePol: IAzurePolicy;
}

export interface IAccountsRes extends IBaseTotalCount, IBasePages {
  controllers: (IMeraki_Account | IAWS_Account | IAZURE_Account)[];
}

export interface IAwsRegion {
  id: number | string;
  name: string;
  code: string;
  city: string;
  country: string;
  lat: number;
  long: number;
}

export interface IAwsRegionsRes extends IBaseTotalCount {
  awsRegions: IAwsRegion[];
}
