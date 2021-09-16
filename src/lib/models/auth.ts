import { IUser } from 'lib/api/ApiModels/Account/account';

export const OKULIS_USER = {
  user: 'okulis_user',
};
export interface ITokenResultModel {
  token: string;
  user: IUser;
}
