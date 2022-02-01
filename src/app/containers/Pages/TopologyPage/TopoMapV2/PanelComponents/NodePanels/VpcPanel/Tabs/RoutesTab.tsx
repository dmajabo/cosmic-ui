import React from 'react';
import { INetworkVNetNode } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { useGet } from 'lib/api/http/useAxiosHook';
import { ControllerKeyTypes, IResourceQueryParam, IRouteResDataItem, IRoutesResData, RoutesResKeyEnum, RoutesResourceTypes } from 'lib/api/ApiModels/Metrics/apiModel';
import { getQueryResourceParam } from 'lib/api/ApiModels/Metrics/queryRoutesHelper';
import { toTimestamp } from 'lib/api/ApiModels/paramBuilders';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import RouteTableWrapper from '../VmTabs/RoutesTab/RouteTableWrapper';

interface Props {
  dataItem: INetworkVNetNode;
}

const RoutesTab: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const userContext = React.useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<IRoutesResData>();
  const [data, setData] = React.useState<IRouteResDataItem[]>([]);

  React.useEffect(() => {
    const _param: IResourceQueryParam = getQueryResourceParam(RoutesResourceTypes.VNetwork, props.dataItem.extId);
    if (topology.selectedTime) {
      _param.timestamp = toTimestamp(topology.selectedTime);
    }
    getDataAsync(TopoApi.getRoutesByKey(ControllerKeyTypes.RouteTables), _param);
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
    await onGet(url, userContext.accessToken!, params);
  };

  return <RouteTableWrapper data={data} showLoader={loading} error={error ? error.message : null} />;
};
export default React.memo(RoutesTab);
