export enum AccountTypes {
  AWS = 'aws',
  MERRAKI = 'meraki',
}

export interface IAccount {
  id?: string;
  type: AccountTypes;
  name: string;
  description: string;
}
