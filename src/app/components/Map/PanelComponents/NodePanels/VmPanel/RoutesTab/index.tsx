import React from 'react';
import { IVnetNode } from 'lib/models/topology';
import { ITableColumn } from 'app/components/Basic/Table/model';
import TableWrapper from 'app/components/Basic/Table/TableWrapper';
import { IResourceQueryParam, ControllerKeyTypes, RoutesResKeyEnum, RoutesResourceTypes } from 'lib/api/ApiModels/Metrics/apiModel';
import { getQueryRoutesParam } from 'lib/api/ApiModels/Metrics/queryRoutesHelper';
import { RoutesApi } from 'lib/api/ApiModels/Metrics/endpoints';
interface IProps {
  dataItem: IVnetNode;
}

const RoutesTab: React.FC<IProps> = (props: IProps) => {
  const [param, setParam] = React.useState<IResourceQueryParam>(null);
  const [columns] = React.useState<ITableColumn[]>([
    { id: 'subnet', field: 'subnet', label: 'Subnet', minWidth: 160 },
    { id: 'name', field: 'name', label: 'Name', minWidth: 100 },
    { id: 'vin', field: 'vin', label: 'Vin', minWidth: 50 },
    { id: 'status', field: 'status', label: 'Status', minWidth: 70 },
  ]);

  React.useEffect(() => {
    const _param: IResourceQueryParam = getQueryRoutesParam(RoutesResourceTypes.NetworkLink, props.dataItem.id);
    setParam(_param);
  }, [props.dataItem]);

  return <TableWrapper columns={columns} param={param} url={RoutesApi.getRoutes(ControllerKeyTypes.RouteTables)} responseKey={RoutesResKeyEnum.RoutesTable} />;
};

export default React.memo(RoutesTab);
