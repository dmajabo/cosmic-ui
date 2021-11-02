export interface ILoggingGridField {
  resField: string;
  label: string;
}
export interface ILoggingGridColumns {
  time: ILoggingGridField;
  edge: ILoggingGridField;
  user: ILoggingGridField;
  operation: ILoggingGridField;
  changes: ILoggingGridField;
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
