import { IGridColumnField } from 'lib/models/grid';

export interface ILoggingGridColumns {
  timestamp: IGridColumnField;
  reqBody: IGridColumnField;
  serviceName: IGridColumnField;
  respStatusCode: IGridColumnField;
  userIP: IGridColumnField;
  reqUrl: IGridColumnField;
  reqType: IGridColumnField;
  userEmail: IGridColumnField;
  userName: IGridColumnField;
  tenantId: IGridColumnField;
}

export const LoggingGridColumns: ILoggingGridColumns = {
  timestamp: {
    resField: 'timestamp',
    label: 'Time',
  },
  reqBody: {
    resField: 'reqBody',
    label: 'Request Body',
  },
  serviceName: {
    resField: 'serviceName',
    label: 'Service Name',
  },
  respStatusCode: {
    resField: 'respStatusCode',
    label: 'Status Code',
  },
  userIP: {
    resField: 'userIP',
    label: 'User IP',
  },
  reqUrl: {
    resField: 'reqUrl',
    label: 'Request Url',
  },
  reqType: {
    resField: 'reqType',
    label: 'Request Type',
  },
  userEmail: {
    resField: 'userEmail',
    label: 'Email',
  },
  userName: {
    resField: 'userName',
    label: 'Name',
  },
  tenantId: {
    resField: 'tenantId',
    label: 'Tenant Id',
  },
};
