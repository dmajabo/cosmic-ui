import { IResourceQueryParam } from './apiModel';

export const getQueryRoutesParam = (_type: any, _id: string): IResourceQueryParam => {
  return { resourceType: _type, resourceId: _id };
};
