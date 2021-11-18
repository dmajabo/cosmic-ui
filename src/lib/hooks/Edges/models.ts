import { IAccountsRes, IAwsRegionsRes } from 'lib/api/ApiModels/Accounts/apiModel';

export enum EdgeChainResObjectFields {
  Accounts = 'accounts',
  AwsRegions = 'awsRegions',
}
export interface IEdgeChainResData {
  awsRegions: IAwsRegionsRes;
  accounts: IAccountsRes;
}

export interface IEdgeGroupsResData {
  awsRegions: IAwsRegionsRes;
  accounts: IAccountsRes;
}
