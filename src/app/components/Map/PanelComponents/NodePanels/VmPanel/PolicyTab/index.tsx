import React from 'react';
import { IVm } from 'lib/models/topology';
import { ITableColumn } from 'app/components/Basic/Table/model';
import TableWrapper from 'app/components/Basic/Table/TableWrapper';
import { IResourceQueryParam, ControllerKeyTypes, RoutesResKeyEnum, SecurityGroupsResourceTypes } from 'lib/api/ApiModels/Metrics/apiModel';
import { getQueryRoutesParam } from 'lib/api/ApiModels/Metrics/queryRoutesHelper';
import { RoutesApi } from 'lib/api/ApiModels/Metrics/endpoints';
interface IProps {
  dataItem: IVm;
}

const PolicyTab: React.FC<IProps> = (props: IProps) => {
  const [param, setParam] = React.useState<IResourceQueryParam>(null);
  const [columns] = React.useState<ITableColumn[]>([
    { id: 'id', field: 'id', label: '#' },
    { id: 'policy', field: 'policy', label: 'Policy', minWidth: 100 },
    { id: 'protocol', field: 'protocol', label: 'Protocol', minWidth: 100 },
    { id: 'source', field: 'source', label: 'Source', minWidth: 100 },
    { id: 'destination', field: 'destination', label: 'Destination', minWidth: 120 },
    { id: 'hits', field: 'hits', label: 'Hits', minWidth: 60 },
  ]);

  const [columnsApplication] = React.useState<ITableColumn[]>([
    { id: 'id', field: 'id', label: '#' },
    { id: 'policy', field: 'policy', label: 'Policy', minWidth: 100 },
    { id: 'aplication', field: 'aplication', label: 'Aplication' },
  ]);
  React.useEffect(() => {
    const _param: IResourceQueryParam = getQueryRoutesParam(SecurityGroupsResourceTypes.Vm, props.dataItem.id);
    setParam(_param);
  }, [props.dataItem]);
  return (
    <>
      <TableWrapper styles={{ margin: '0 0 20px 0' }} columns={columns} url={RoutesApi.getRoutes(ControllerKeyTypes.SecurityGroups)} param={param} responseKey={RoutesResKeyEnum.RoutesTable} />
      <TableWrapper columns={columnsApplication} url={RoutesApi.getRoutes(ControllerKeyTypes.SecurityGroups)} param={param} responseKey={RoutesResKeyEnum.RoutesTable} />
    </>
  );
};

export default React.memo(PolicyTab);
