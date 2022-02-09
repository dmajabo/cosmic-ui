import { IAlertChannel, IAlertMeta, IAlertMetaDataRes } from 'lib/api/ApiModels/Workflow/apiModel';
import { getSearchedList } from 'lib/helpers/listHelper';
import { IGridColumnField } from 'lib/models/grid';

export interface ITriggerGridColumns {
  id: IGridColumnField;
  name: IGridColumnField;
  type: IGridColumnField;
  category: IGridColumnField;
  severity: IGridColumnField;
  configState: IGridColumnField;
  metaDescString: IGridColumnField;
  channels: IGridColumnField;
  triggerCount: IGridColumnField;
}
export const TriggerGridColumns: ITriggerGridColumns = {
  id: {
    resField: 'id',
    label: '',
    id: 'triggerId',
    field: 'id',
    width: '40px',
    hide: false,
  },
  name: {
    resField: 'name',
    label: 'Name',
    id: 'triggerName',
    field: 'name',
    width: '400px',
    hide: false,
  },
  type: {
    resField: 'type',
    label: 'Type',
    id: 'triggerType',
    field: 'type',
    hide: false,
  },
  category: {
    resField: 'category',
    label: 'Category',
    id: 'triggerCategory',
    field: 'category',
    width: '240px',
    hide: false,
  },
  severity: {
    resField: 'severity',
    label: 'Severity',
    id: 'triggerSeverity',
    field: 'severity',
    width: '240px',
    hide: false,
  },
  metaDescString: {
    resField: 'metaDescString',
    label: 'Description',
    id: 'triggerDescription',
    field: 'metaDescString',
    width: '400px',
    hide: true,
  },
  channels: {
    resField: 'channels',
    label: 'Actions',
    id: 'triggercchannels',
    field: 'channels',
    hide: false,
  },
  triggerCount: {
    resField: 'triggerCount',
    label: 'Hits',
    id: 'triggerCount',
    field: 'triggerCount',
    width: '100px',
    hide: false,
  },
  configState: {
    id: 'configState',
    resField: 'configState',
    field: 'configState',
    label: '',
    width: '160px',
    hide: false,
  },
};

export const getSearchedListData = (data: IAlertMetaTableItem[], searchValue: string): IAlertMetaTableItem[] => {
  const _arr: IAlertMetaTableItem[] = getSearchedList(data, searchValue, [
    TriggerGridColumns.name.resField,
    TriggerGridColumns.category.resField,
    TriggerGridColumns.type.resField,
    TriggerGridColumns.triggerCount.resField,
    TriggerGridColumns.severity.resField,
    TriggerGridColumns.configState.resField,
  ]);
  return _arr;
};

export interface IAlertMetaTableItem extends IAlertMeta {
  channels: IAlertChannel[];
}

export const getMappedData = (res: IAlertMetaDataRes): IAlertMetaTableItem[] => {
  const _arr: IAlertMetaTableItem[] = res.alertMetadata.map(it => ({ ...it, id: it.id ? it.id : `CUSTOM_${it.type}`, channels: getChannels(it, res) }));
  return _arr;
};

const getChannels = (item: IAlertMeta, res: IAlertMetaDataRes): IAlertChannel[] => {
  if (!res.channels || !res.channels.length) return [];
  const _arr: IAlertChannel[] = res.channels.filter(it => it.isDefault);
  return _arr;
};

export interface INestedTriggerGridColumns {
  id: IGridColumnField;
  alertType: IGridColumnField;
  descString: IGridColumnField;
  labels: IGridColumnField;
  objectExtId: IGridColumnField;
  objectName: IGridColumnField;
  objectType: IGridColumnField;
  state: IGridColumnField;
  timestamp: IGridColumnField;
}
export const NestedTriggerGridColumns: INestedTriggerGridColumns = {
  id: {
    resField: 'id',
    label: '',
    field: 'id',
    width: '40px',
    hide: false,
  },
  alertType: {
    resField: 'alertType',
    label: 'Alert Type',
    field: 'alertType',
    width: '240px',
    hide: false,
  },
  descString: {
    resField: 'descString',
    label: 'Description',
    field: 'descString',
    width: '400px',
    hide: false,
  },
  labels: {
    resField: 'labels',
    label: 'Labels',
    field: 'labels',
    width: '400px',
    hide: false,
  },
  objectExtId: {
    resField: 'objectExtId',
    label: 'Ext ID',
    field: 'objectExtId',
    width: '240px',
    hide: false,
  },
  objectName: {
    resField: 'objectName',
    label: 'Name',
    field: 'objectName',
    width: '300px',
    hide: true,
  },
  objectType: {
    resField: 'objectType',
    label: 'Type',
    field: 'objectType',
    width: '200px',
    hide: false,
  },
  state: {
    resField: 'state',
    label: 'State',
    field: 'state',
    width: '100px',
    hide: false,
  },
  timestamp: {
    resField: 'timestamp',
    field: 'timestamp',
    label: 'Time',
    width: '260px',
    hide: false,
  },
};
