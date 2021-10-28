import React, { useContext } from 'react';
import { IWedgeNode } from 'lib/models/topology';
import { IResourceQueryParam, ControllerKeyTypes, RoutesResKeyEnum, RoutesResourceTypes, IRoutesResData, IRouteResDataItem } from 'lib/api/ApiModels/Metrics/apiModel';
import { RoutesApi } from 'lib/api/ApiModels/Metrics/endpoints';
import { getQueryResourceParam } from 'lib/api/ApiModels/Metrics/queryRoutesHelper';
import { useGet } from 'lib/api/http/useAxiosHook';
import RouteTableWrapper from './RouteTableWrapper';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import { toTimestamp } from 'lib/api/ApiModels/Topology/endpoints';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
interface IProps {
  dataItem: IWedgeNode;
}

const RoutesTab: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<IRoutesResData>();
  const [data, setData] = React.useState<IRouteResDataItem[]>([]);

  React.useEffect(() => {
    const _param: IResourceQueryParam = getQueryResourceParam(RoutesResourceTypes.WEdge, props.dataItem.extId);
    if (topology.selectedTime) {
      _param.timestamp = toTimestamp(topology.selectedTime);
    }
    getDataAsync(RoutesApi.getRoutes(ControllerKeyTypes.RouteTables), _param);
  }, [props.dataItem, topology.selectedTime]);

  React.useEffect(() => {
    if (response !== null && response[RoutesResKeyEnum.RoutesTable] !== undefined) {
      setData(response[RoutesResKeyEnum.RoutesTable]);
    }
  }, [response]);

  const getDataAsync = async (url: string, params: any) => {
    if (!url || !params) {
      return;
    }
    await onGet(url, userContext.idToken!, params);
  };

  return <RouteTableWrapper data={data} showLoader={loading} error={error ? error.message : null} />;
};

export default React.memo(RoutesTab);
