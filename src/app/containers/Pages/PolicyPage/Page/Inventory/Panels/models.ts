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
  extId: IGridColumnField;
  segment: IGridColumnField;
  protocol: IGridColumnField;
  source: IGridColumnField;
  destination: IGridColumnField;
  portRange: IGridColumnField;
}

export const SecurityGroupTableGridColumns: ISecurityGroupTableGridColumns = {
  extId: {
    label: 'Rule ID',
    resField: 'extId',
    id: 'securityGroupTableextId',
    field: 'extId',
    width: '240px',
    minWidth: '240px',
    hide: false,
    sortable: true,
  },
  segment: {
    label: 'Segment',
    resField: 'segment',
    id: 'securityGroupTablesegment',
    field: 'segment',
    width: '200px',
    minWidth: '200px',
    hide: false,
    sortable: false,
  },
  protocol: {
    label: 'Protocol',
    resField: 'ipProtocol',
    id: 'securityGroupTableipProtocol',
    field: 'ipProtocol',
    width: '160px',
    minWidth: '160px',
    hide: false,
    sortable: false,
  },
  // for inbound
  source: {
    label: 'Source',
    resField: 'cidrs',
    id: 'securityGroupTablecidrs',
    field: 'cidrs',
    width: '160px',
    minWidth: '160px',
    hide: false,
    sortable: false,
  },
  // for outbound
  destination: {
    label: 'Destination',
    resField: 'cidrs',
    id: 'securityGroupTablecidrs',
    field: 'cidrs',
    width: '160px',
    minWidth: '160px',
    hide: false,
    sortable: false,
  },
  portRange: {
    label: 'Port Range',
    resField: 'fromPort',
    id: 'securityGroupTablefromPort',
    field: 'fromPort',
    width: '160px',
    minWidth: '160px',
    hide: false,
    sortable: false,
  },
};
