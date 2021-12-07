import { IGridColumnField } from 'lib/models/grid';

export interface ILoggingGridColumns {
  time: IGridColumnField;
  edge: IGridColumnField;
  user: IGridColumnField;
  operation: IGridColumnField;
  changes: IGridColumnField;
}

export const LoggingGridColumns: ILoggingGridColumns = {
  time: {
    resField: 'time',
    label: 'Time',
  },
  edge: {
    resField: 'edge',
    label: 'Edge',
  },
  user: {
    resField: 'user',
    label: 'User',
  },
  operation: {
    resField: 'operation',
    label: 'Operation',
  },
  changes: {
    resField: 'changes',
    label: 'Changes',
  },
};
