import { IResourceQueryParam } from './apiModel';

export const getQueryResourceParam = (_type: any, _id: string): IResourceQueryParam => {
  if (!_type || !_id) {
    return null;
  }
  return { resourceType: _type, resourceId: _id };
};
