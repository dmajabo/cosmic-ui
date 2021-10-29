import React, { useContext } from 'react';
import { IWedgeNode } from 'lib/models/topology';
import { IResourceQueryParam, ControllerKeyTypes, SecurityGroupsResourceTypes, IPolicyRes, IVmRule, PolicyResKeyEnum, PolicyTableKeyEnum } from 'lib/api/ApiModels/Metrics/apiModel';
import { PolicyApi } from 'lib/api/ApiModels/Metrics/endpoints';
import PolicyTable from './PolicyTable';
import { useGet } from 'lib/api/http/useAxiosHook';
import { getQueryResourceParam } from 'lib/api/ApiModels/Metrics/queryRoutesHelper';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import { toTimestamp } from 'lib/api/ApiModels/Topology/endpoints';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';

interface IProps {
  dataItem: IWedgeNode;
}

const PolicyTab: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<IPolicyRes>();
  const [inData, setInData] = React.useState<IVmRule[]>([]);
  const [outData, setOutData] = React.useState<IVmRule[]>([]);

  React.useEffect(() => {
    const _param: IResourceQueryParam = getQueryResourceParam(SecurityGroupsResourceTypes.VNetwork, props.dataItem.extId);
    if (topology.selectedTime) {
      _param.timestamp = toTimestamp(topology.selectedTime);
    }
    getDataAsync(PolicyApi.getPolicy(ControllerKeyTypes.SecurityGroups), _param);
  }, [props.dataItem, topology.selectedTime]);

  React.useEffect(() => {
    if (response !== null && response[PolicyResKeyEnum.SecurityGroups] !== undefined) {
      const _indata = [];
      const _outdata = [];
      response[PolicyResKeyEnum.SecurityGroups].forEach(it => {
        if (!it.rules || !it.rules.length) {
          return;
        }
        it.rules.forEach(rule => {
          if (rule.ruleType === PolicyTableKeyEnum.Inbound) {
            _indata.push(rule);
          }
          if (rule.ruleType === PolicyTableKeyEnum.Outbound) {
            _outdata.push(rule);
          }
        });
      });
      setInData(_indata);
      setOutData(_outdata);
    }
  }, [response]);

  const getDataAsync = async (url: string, params: any) => {
    if (!url || !params) {
      return;
    }
    await onGet(url, userContext.idToken!, params);
  };

  return (
    <>
      <PolicyTable title={PolicyTableKeyEnum.Inbound} styles={{ margin: '0 0 20px 0', flexDirection: 'column' }} data={inData} showLoader={loading} error={error ? error.message : null} />
      <PolicyTable title={PolicyTableKeyEnum.Outbound} styles={{ flexDirection: 'column' }} data={outData} showLoader={loading} error={error ? error.message : null} />
    </>
  );
};

export default React.memo(PolicyTab);
