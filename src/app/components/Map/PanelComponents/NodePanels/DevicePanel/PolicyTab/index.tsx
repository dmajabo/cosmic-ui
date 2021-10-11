import React from 'react';
import { IDeviceNode } from 'lib/models/topology';
import { IResourceQueryParam, ControllerKeyTypes, SecurityGroupsResourceTypes, IPolicyRes, IDeviceRule, PolicyResKeyEnum } from 'lib/api/ApiModels/Metrics/apiModel';
import { PolicyApi } from 'lib/api/ApiModels/Metrics/endpoints';
import PolicyTable from './PolicyTable';
import { useGet } from 'lib/api/http/useAxiosHook';
import { getQueryResourceParam } from 'lib/api/ApiModels/Metrics/queryRoutesHelper';

interface IProps {
  dataItem: IDeviceNode;
}

const PolicyTab: React.FC<IProps> = (props: IProps) => {
  const { response, loading, error, onGet } = useGet<IPolicyRes>();
  const [data, setData] = React.useState<IDeviceRule[]>([]);
  React.useEffect(() => {
    const _param: IResourceQueryParam = getQueryResourceParam(SecurityGroupsResourceTypes.VNetwork, props.dataItem.vnetworks[0].extId);
    getDataAsync(PolicyApi.getPolicy(ControllerKeyTypes.SecurityGroups), _param);
  }, [props.dataItem]);

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
    await onGet(url, params);
  };
  // title={PolicyTableKeyEnum.Inbound}
  return (
    <>
      <PolicyTable styles={{ margin: '0 0 20px 0', flexDirection: 'column' }} data={data} showLoader={loading} error={error ? error.message : null} />
    </>
  );
};

export default React.memo(PolicyTab);
