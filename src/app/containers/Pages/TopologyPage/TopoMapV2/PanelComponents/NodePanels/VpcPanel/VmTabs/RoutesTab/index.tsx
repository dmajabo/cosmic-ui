import React, { useContext } from 'react';
import RouteTableWrapper from './RouteTableWrapper';
import { IResourceQueryParam, ControllerKeyTypes, RoutesResKeyEnum, RoutesResourceTypes, IRoutesResData, IRouteResDataItem } from 'lib/api/ApiModels/Metrics/apiModel';
import { getQueryResourceParam } from 'lib/api/ApiModels/Metrics/queryRoutesHelper';
import { useGet } from 'lib/api/http/useAxiosHook';
import { toTimestamp } from 'lib/api/ApiModels/paramBuilders';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
interface IProps {
  extId: string;
}

const RoutesTab: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyV2DataContext();
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<IRoutesResData>();
  const [data, setData] = React.useState<IRouteResDataItem[]>([]);

  React.useEffect(() => {
    const _param: IResourceQueryParam = getQueryResourceParam(RoutesResourceTypes.VNetwork, props.extId);
    if (topology.selectedTime) {
      _param.timestamp = toTimestamp(topology.selectedTime);
    }
    getDataAsync(TopoApi.getRoutesByKey(ControllerKeyTypes.RouteTables), _param);
  }, [props.extId, topology.selectedTime]);

  React.useEffect(() => {
    if (response !== null && response[RoutesResKeyEnum.RoutesTable] !== undefined) {
      setData(response[RoutesResKeyEnum.RoutesTable]);
    }
  }, [response]);

  const getDataAsync = async (url: string, params: any) => {
    if (!url || !params) {
      return;
    }
    await onGet(url, userContext.accessToken!, params);
  };

  return <RouteTableWrapper data={data} showLoader={loading} error={error ? error.message : null} />;
};

export default React.memo(RoutesTab);
