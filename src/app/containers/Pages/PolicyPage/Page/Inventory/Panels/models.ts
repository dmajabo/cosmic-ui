import { IGridColumnField } from 'lib/models/grid';

export interface IRouteTableGridColumns {
  destination: IGridColumnField;
  target: IGridColumnField;
  status: IGridColumnField;
  propagated: IGridColumnField;
}

export const RouteTableColumns: IRouteTableGridColumns = {
  destination: {
    label: 'Destination',
    resField: 'destinationCidr',
    id: 'routeTabledestinationCidr',
    field: 'destinationCidr',
    width: '160px',
    minWidth: '160px',
    hide: false,
    sortable: false,
  },
  target: {
    label: 'Next Hop',
    resField: 'target',
    id: 'routeTabletarget',
    field: 'target',
    width: '260px',
    minWidth: '260px',
    maxWidth: '260px',
    hide: false,
    sortable: true,
  },
  status: {
    label: 'Status',
    resField: 'state',
    id: 'routeTablestate',
    field: 'state',
    width: '100px',
    minWidth: '100px',
    maxWidth: '100px',
    hide: false,
    sortable: true,
  },
  propagated: {
    label: 'Propagated',
    resField: 'extId',
    id: 'routeTablepropagated',
    field: 'extId',
    width: '160px',
    minWidth: '160px',
    hide: false,
    sortable: true,
  },
};

export interface ISecurityGroupTableGridColumns {
  name: IGridColumnField;
  ruleId: IGridColumnField;
  ipVersion: IGridColumnField;
  ruleType: IGridColumnField;
  protocol: IGridColumnField;
  portRange: IGridColumnField;
  source: IGridColumnField;
}

export const SecurityGroupTableGridColumns: ISecurityGroupTableGridColumns = {
  name: {
    label: 'Name',
    resField: 'name',
    id: 'securityGroupTablename',
    field: 'name',
    width: '160px',
    minWidth: '160px',
    hide: false,
    sortable: true,
  },
  // Unknown
  ruleId: {
    label: 'Security group rule id',
    resField: 'destinationCidr',
    id: 'securityGroupTabledestinationCidr',
    field: 'destinationCidr',
    width: '300px',
    minWidth: '300px',
    hide: false,
    sortable: false,
  },
  // Unknown
  ipVersion: {
    label: 'IP version',
    resField: 'destinationCidr',
    id: 'securityGroupTabledestinationCidr',
    field: 'destinationCidr',
    width: '300px',
    minWidth: '300px',
    hide: false,
    sortable: false,
  },
  ruleType: {
    label: 'Type',
    resField: 'ruleType',
    id: 'securityGroupTableruleType',
    field: 'ruleType',
    width: '100px',
    minWidth: '100px',
    hide: false,
    sortable: false,
    format: (v: string) => {
      if (v && v.toLocaleLowerCase() === 'l3_inbound') return 'inbound';
      if (v && v.toLocaleLowerCase() === 'l3_outbound') return 'outbound';
      return v;
    },
  },
  protocol: {
    label: 'Type',
    resField: 'ipProtocol',
    id: 'securityGroupTableipProtocol',
    field: 'ipProtocol',
    width: '100px',
    minWidth: '100px',
    hide: false,
    sortable: false,
  },
  portRange: {
    label: 'Port Range',
    resField: 'fromPort',
    id: 'securityGroupTablefromPort',
    field: 'fromPort',
    width: '200px',
    minWidth: '200px',
    hide: false,
    sortable: false,
  },
  source: {
    label: 'Source',
    resField: 'srcCidrs',
    id: 'securityGroupTablesrcCidrs',
    field: 'srcCidrs',
    width: '160px',
    minWidth: '160px',
    hide: false,
    sortable: false,
  },
};
