export enum IQuryFieldtype {
  STRING = 'string',
  NUMBER = 'number',
}

export enum ElasticFilterSuffics {
  AUTOCOMPLETE = 'autocomplete',
  KEYWORD = 'keyword',
}

export interface IElasticField {
  label: string;
  resField: string;
  searchField: string;
  queryType: IQuryFieldtype;
  isField: boolean;
  valueTransform?: (v: string) => string;
}
export interface IElasticFilterModel {
  value: string;
  field: IElasticField;
}
