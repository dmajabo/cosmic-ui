import React from 'react';
import { IVm } from 'lib/models/topology';
import { IResourceQueryParam, ControllerKeyTypes, SecurityGroupsResourceTypes, IVmPolicyRes, IVmRule, PolicyResKeyEnum, PolicyTableKeyEnum } from 'lib/api/ApiModels/Metrics/apiModel';
import { PolicyApi } from 'lib/api/ApiModels/Metrics/endpoints';
import InboundTable from './InboundTable';
import { useGet } from 'lib/api/http/useAxiosHook';
import { getQueryResourceParam } from 'lib/api/ApiModels/Metrics/queryRoutesHelper';
import OutboundTable from './OutboundTable';
interface IProps {
  dataItem: IVm;
}

const PolicyTab: React.FC<IProps> = (props: IProps) => {
  const { response, loading, error, onGet } = useGet<IVmPolicyRes>();
  const [inData, setInData] = React.useState<IVmRule[]>([]);
  const [outData, setOutData] = React.useState<IVmRule[]>([]);
  React.useEffect(() => {
    const _param: IResourceQueryParam = getQueryResourceParam(SecurityGroupsResourceTypes.Vm, props.dataItem.id);
    getDataAsync(PolicyApi.getPolicy(ControllerKeyTypes.SecurityGroups), _param);
  }, [props.dataItem]);

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
    await onGet(url, params);
  };

  return (
    <>
      <InboundTable styles={{ margin: '0 0 20px 0' }} data={inData} showLoader={loading} error={error ? error.message : null} />
      <OutboundTable data={outData} showLoader={loading} error={error ? error.message : null} />
    </>
  );
};

export default React.memo(PolicyTab);
