import { IGridColumnField } from 'lib/models/grid';

export interface ILayer3GridColumns {
  id: IGridColumnField;
  policy: IGridColumnField;
  protocol: IGridColumnField;
  destination: IGridColumnField;
  portRange: IGridColumnField;
}

export const Layer3Columns: ILayer3GridColumns = {
  id: {
    label: '',
    resField: 'id',
    id: 'layer3Id',
    field: 'id',
    width: '40px',
    hide: false,
    sortable: false,
  },
  policy: {
    label: 'Policy',
    resField: 'policy',
    id: 'layer3policy',
    field: 'policy',
    width: '200px',
    hide: false,
    sortable: true,
  },
  protocol: {
    label: 'Protocol',
    resField: 'ipProtocol',
    id: 'layer3ipProtocol',
    field: 'ipProtocol',
    width: '200px',
    hide: false,
    sortable: true,
  },
  destination: {
    label: 'Destination',
    resField: 'destCidrs',
    id: 'layer3destCidrs',
    field: 'destCidrs',
    width: '200px',
    hide: false,
    sortable: false,
  },
  portRange: {
    label: 'Port Range',
    resField: 'fromPort',
    id: 'layer3fromPortToPort',
    field: 'fromPort',
    width: '200px',
    hide: false,
    sortable: true,
  },
};

export interface ILayer7GridColumns {
  policy: IGridColumnField;
  application: IGridColumnField;
}

export const Layer7Columns: ILayer7GridColumns = {
  policy: {
    label: 'Policy',
    resField: 'policy',
    id: 'layer7policy',
    field: 'policy',
    width: '50%',
    hide: false,
    sortable: true,
  },
  application: {
    label: 'Application',
    resField: 'ipProtocol',
    id: 'layer3ipProtocol',
    field: 'ipProtocol',
    width: '50%',
    hide: false,
    sortable: true,
  },
};

export interface IRoutesGridColumns {
  name: IGridColumnField;
  extId: IGridColumnField;
  description: IGridColumnField;
  routes: IGridColumnField;
  numberOfRoutes: IGridColumnField;
}

export const RoutesColumns: IRoutesGridColumns = {
  name: {
    label: 'Route name',
    resField: 'name',
    id: 'routesname',
    field: 'name',
    minWidth: '200px',
    maxWidth: '600px',
    hide: false,
    sortable: true,
  },
  extId: {
    label: 'Table id',
    resField: 'extId',
    id: 'routesExtId',
    field: 'extId',
    hide: false,
    sortable: true,
  },
  description: {
    label: 'Description',
    resField: 'description',
    id: 'routesdescription',
    field: 'description',
    width: '200px',
    minWidth: '200px',
    hide: false,
    sortable: false,
  },
  routes: {
    label: 'Routes',
    resField: 'routes',
    id: 'routesRoutes',
    field: 'routes',
    width: '200px',
    hide: false,
    sortable: true,
  },
  numberOfRoutes: {
    label: 'Number Of Routes',
    resField: 'numberOfRoutes',
    id: 'routesnumberOfRoutes',
    field: 'numberOfRoutes',
    width: '170px',
    minWidth: '170px',
    maxWidth: '170px',
    hide: false,
    sortable: true,
  },
};

export interface ISecurityGroupsGridColumns {
  name: IGridColumnField;
  extId: IGridColumnField;
  description: IGridColumnField;
  rules: IGridColumnField;
  // ownerId: IGridColumnField;
  // regionCode: IGridColumnField;
}

export const SecurityGroupsColumns: ISecurityGroupsGridColumns = {
  name: {
    label: 'Security Group name',
    resField: 'name',
    id: 'securityGroupname',
    field: 'name',
    minWidth: '200px',
    maxWidth: '600px',
    hide: false,
    sortable: true,
  },
  extId: {
    label: 'Group ID',
    resField: 'extId',
    id: 'securityGroupExtId',
    field: 'extId',
    hide: false,
    sortable: true,
  },
  description: {
    label: 'Description',
    resField: 'description',
    id: 'securityGroupdescription',
    field: 'description',
    width: '200px',
    hide: false,
    sortable: false,
  },
  rules: {
    label: 'Rules',
    resField: 'rules',
    id: 'securityGrouprules',
    field: 'rules',
    width: '200px',
    hide: false,
    sortable: true,
  },
};
