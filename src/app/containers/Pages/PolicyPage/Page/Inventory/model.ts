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
