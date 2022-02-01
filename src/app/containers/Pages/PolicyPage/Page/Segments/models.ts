import { IGridColumnField } from 'lib/models/grid';

export interface ISegmentsGridColumns {
  name: IGridColumnField;
  type: IGridColumnField;
  source: IGridColumnField;
  color: IGridColumnField;
  isSystemSegment: IGridColumnField;
  description: IGridColumnField;
}

export const SegmentsGridColumns: ISegmentsGridColumns = {
  name: {
    resField: 'name',
    label: 'Name',
  },
  description: {
    resField: 'description',
    label: 'Description',
  },
  type: {
    resField: 'segType',
    label: 'Type',
  },
  source: {
    resField: 'networkSegPol',
    label: 'Source',
  },
  color: {
    resField: 'color',
    label: '',
  },
  isSystemSegment: {
    resField: 'isSystemSegment',
    label: 'Is System',
  },
};

export enum ITopologySegmentFields {
  NAME = 'name',
  DESCRIPTION = 'description',
  COLOR = 'color',
}
