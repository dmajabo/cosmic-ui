import React, { useContext } from 'react';
import { IDeviceNode } from 'lib/models/topology';
import { IResourceQueryParam, ControllerKeyTypes, SecurityGroupsResourceTypes, IPolicyRes, IDeviceRule, PolicyResKeyEnum } from 'lib/api/ApiModels/Metrics/apiModel';
import PolicyTable from './PolicyTable';
import { useGet } from 'lib/api/http/useAxiosHook';
import { getQueryResourceParam } from 'lib/api/ApiModels/Metrics/queryRoutesHelper';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { toTimestamp } from 'lib/api/ApiModels/paramBuilders';

interface IProps {
  dataItem: IDeviceNode;
}

const PolicyTab: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<IPolicyRes>();
  const [data, setData] = React.useState<IDeviceRule[]>([]);

  React.useEffect(() => {
    const _param: IResourceQueryParam = getQueryResourceParam(SecurityGroupsResourceTypes.VNetwork, props.dataItem.vnetworks[0].extId);
    if (topology.selectedTime) {
      _param.timestamp = toTimestamp(topology.selectedTime);
    }
    getDataAsync(TopoApi.getPolicyByKey(ControllerKeyTypes.SecurityGroups), _param);
  }, [props.dataItem, topology.selectedTime]);

  React.useEffect(() => {
    if (response !== null && response[PolicyResKeyEnum.SecurityGroups] !== undefined) {
      const _data = [];
      response[PolicyResKeyEnum.SecurityGroups].forEach(it => {
        if (!it.rules || !it.rules.length) {
          return;
        }
        it.rules.forEach(rule => {
          _data.push(rule);
        });
      });
      setData(_data);
    }
  }, [response]);

  const getDataAsync = async (url: string, params: any) => {
    if (!url || !params) {
      return;
    }
    await onGet(url, userContext.accessToken!, params);
  };
  // title={PolicyTableKeyEnum.Inbound}
  return (
    <>
      <PolicyTable styles={{ margin: '0 0 20px 0', flexDirection: 'column' }} data={data} showLoader={loading} error={error ? error.message : null} />
    </>
  );
};

export default React.memo(PolicyTab);
