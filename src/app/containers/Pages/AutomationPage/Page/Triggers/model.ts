import { IAlertMeta } from 'lib/api/ApiModels/Workflow/apiModel';
import { getSearchedList } from 'lib/helpers/listHelper';
import { IGridColumnField } from 'lib/models/grid';

export interface ITriggerGridColumns {
  name: IGridColumnField;
  type: IGridColumnField;
  category: IGridColumnField;
  severity: IGridColumnField;
  configState: IGridColumnField;
  metaDescString: IGridColumnField;
  channelIds: IGridColumnField;
  triggerCount: IGridColumnField;
}
export const TriggerGridColumns: ITriggerGridColumns = {
  name: {
    resField: 'name',
    label: 'Name',
  },
  type: {
    resField: 'type',
    label: 'Type',
  },
  category: {
    resField: 'category',
    label: 'Category',
  },
  severity: {
    resField: 'severity',
    label: 'Severity',
  },
  configState: {
    resField: 'configState',
    label: 'Config State',
  },
  metaDescString: {
    resField: 'metaDescString',
    label: 'Description',
  },
  channelIds: {
    resField: 'channelIds',
    label: 'Actions',
  },
  triggerCount: {
    resField: 'triggerCount',
    label: 'Hits',
  },
};

export const getSearchedListData = (data: IAlertMeta[], searchValue: string): IAlertMeta[] => {
  const _arr: IAlertMeta[] = getSearchedList(data, searchValue, [
    TriggerGridColumns.name.resField,
    TriggerGridColumns.category.resField,
    TriggerGridColumns.type.resField,
    TriggerGridColumns.triggerCount.resField,
    TriggerGridColumns.severity.resField,
    TriggerGridColumns.configState.resField,
  ]);
  return _arr;
};
