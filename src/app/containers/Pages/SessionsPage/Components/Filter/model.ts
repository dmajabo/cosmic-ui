import { IBaseEntity } from 'lib/models/general';

export interface IAutoCompliteItem extends IBaseEntity<string> {
  label: string;
}
