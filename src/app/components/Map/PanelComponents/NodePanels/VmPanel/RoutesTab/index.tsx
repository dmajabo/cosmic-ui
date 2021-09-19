import React from 'react';
import { IVnetNode } from 'lib/models/topology';
import { IResourceQueryParam, ControllerKeyTypes, RoutesResKeyEnum, RoutesResourceTypes, IRoutesResData, IRouteResDataItem } from 'lib/api/ApiModels/Metrics/apiModel';
import { RoutesApi } from 'lib/api/ApiModels/Metrics/endpoints';
import { getQueryResourceParam } from 'lib/api/ApiModels/Metrics/queryRoutesHelper';
import { useGet } from 'lib/api/http/useAxiosHook';
import RouteTable from './RouteTable';
interface IProps {
  dataItem: IVnetNode;
}

const RoutesTab: React.FC<IProps> = (props: IProps) => {
  const { response, loading, error, onGet } = useGet<IRoutesResData>();
  const [data, setData] = React.useState<IRouteResDataItem[]>([]);

  React.useEffect(() => {
    const _param: IResourceQueryParam = getQueryResourceParam(RoutesResourceTypes.VNetwork, props.dataItem.id);
    getDataAsync(RoutesApi.getRoutes(ControllerKeyTypes.RouteTables), _param);
  }, [props.dataItem]);

  React.useEffect(() => {
    if (response !== null && response[RoutesResKeyEnum.RoutesTable] !== undefined) {
      setData(response[RoutesResKeyEnum.RoutesTable]);
    }
  }, [response]);

  const getDataAsync = async (url: string, params: any) => {
    if (!url || !params) {
      return;
    }
    await onGet(url, params);
  };

  return <RouteTable data={data} showLoader={loading} error={error ? error.message : null} />;
};

export default React.memo(RoutesTab);
