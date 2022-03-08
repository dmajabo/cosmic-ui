import { IGridColumnField } from 'lib/models/grid';

export interface IAppTrafficTColumns {
  network: IGridColumnField;
  sent: IGridColumnField;
  received: IGridColumnField;
  flows: IGridColumnField;
  activeTime: IGridColumnField;
  noOfClients: IGridColumnField;
}

export interface IAppTrafficNestedColumns extends Omit<IAppTrafficTColumns, 'network'> {
  destination: IGridColumnField;
}

export const AppTrafficColumns: IAppTrafficTColumns = {
  network: {
    label: 'Network/SITE',
    field: 'name',
    sortable: true,
    resField: 'name',
    minWidth: '80px',
  },
  flows: {
    label: 'Flows',
    field: 'flows',
    sortable: true,
    resField: 'flows',
    minWidth: '30px',
  },
  received: {
    label: 'Received',
    field: 'recv',
    sortable: false,
    resField: 'recv',
    minWidth: '30px',
  },
  sent: {
    label: 'Sent',
    field: 'sent',
    sortable: false,
    resField: 'sent',
    minWidth: '30px',
  },
  activeTime: {
    label: 'Active Time',
    field: 'activeTime',
    sortable: false,
    resField: 'activeTime',
    minWidth: '50px',
  },
  noOfClients: {
    label: 'Clients',
    field: 'noOfClients',
    sortable: false,
    resField: 'noOfClients',
    minWidth: '50px',
  },
};

export const AppTrafficNestedColumns: IAppTrafficNestedColumns = {
  ...AppTrafficColumns,
  destination: {
    label: 'Destination',
    field: 'destination',
    sortable: false,
    resField: 'destination',
    minWidth: '70px',
  },
};
