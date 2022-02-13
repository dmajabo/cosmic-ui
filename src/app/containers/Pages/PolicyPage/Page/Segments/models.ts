import { IGridColumnField } from 'lib/models/grid';

export interface ISegmentsGridColumns {
  id: IGridColumnField;
  name: IGridColumnField;
  type: IGridColumnField;
  // source: IGridColumnField;
  color: IGridColumnField;
  isSystemSegment: IGridColumnField;
  description: IGridColumnField;
}

export const SegmentsGridColumns: ISegmentsGridColumns = {
  color: {
    resField: 'color',
    field: 'color',
    label: '',
    sortable: true,
    hide: false,
    width: '80px',
  },
  name: {
    resField: 'name',
    field: 'name',
    label: 'Name',
    sortable: true,
    hide: false,
    width: '300px',
  },
  type: {
    resField: 'segType',
    field: 'segType',
    label: 'Type',
    sortable: true,
    hide: false,
    width: '200px',
  },
  description: {
    resField: 'description',
    field: 'description',
    label: 'Description',
    hide: false,
  },
  id: {
    resField: 'id',
    field: 'id',
    label: 'Source',
  },
  isSystemSegment: {
    resField: 'isSystemSegment',
    field: 'isSystemSegment',
    label: 'System Defined',
    sortable: true,
    hide: false,
    width: '140px',
  },
};

export enum ITopologySegmentFields {
  NAME = 'name',
  DESCRIPTION = 'description',
  COLOR = 'color',
}
