import { IBaseEntity } from 'lib/models/general';

export enum UserRole {
  ADMIN = 'admin',
  MANGER = 'manager',
}
export interface IUser extends IBaseEntity<string | number> {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  role?: any; // typeof UserRole
}
