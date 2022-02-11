import React from 'react';
import H2 from 'app/components/Basic/H2';
import { ControllerKeyTypes, IToposvcListSecurityGroupResponse, PolicyResKeyEnum, PolicyTableKeyEnum } from 'lib/api/ApiModels/Metrics/apiModel';
import { INetworkRule } from 'lib/api/ApiModels/Topology/apiModels';
import { useGet } from 'lib/api/http/useAxiosHook';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';

import InboundTable from './InboundTable';
import OutboundTable from './OutboundTable';
import { LayerWrapper } from '../styles';

interface Props {}

const Layer3 = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<IToposvcListSecurityGroupResponse>();
  const [inData, setInData] = React.useState<INetworkRule[]>([]);
  const [outData, setOutData] = React.useState<INetworkRule[]>([]);
  React.useEffect(() => {
    getDataAsync(TopoApi.getPolicyByKey(ControllerKeyTypes.SecurityGroups));
  }, []);

  React.useEffect(() => {
    if (response !== null && response[PolicyResKeyEnum.SecurityGroups] !== undefined) {
      const _indata = [];
      const _outdata = [];
      response[PolicyResKeyEnum.SecurityGroups].forEach((it, grIndex) => {
        if (!it.rules || !it.rules.length) {
          return;
        }
        it.rules.forEach((rule, index) => {
          const _id = rule.id || `rule_${grIndex}_${index}`;
          if (rule.ruleType === PolicyTableKeyEnum.Inbound) {
            _indata.push({ ...rule, id: _id });
          }
          if (rule.ruleType === PolicyTableKeyEnum.Outbound) {
            _outdata.push({ ...rule, id: _id });
          }
        });
      });
      setInData(_indata);
      setOutData(_outdata);
    }
  }, [response]);

  const getDataAsync = async (url: string) => {
    await onGet(url, userContext.accessToken!);
  };

  return (
    <LayerWrapper style={{ margin: '0 0 40px 0' }}>
      <H2>Layer 3</H2>
      <InboundTable data={inData} totalCount={inData.length} loading={loading} error={error ? error.message : null} />
      <OutboundTable data={outData} totalCount={outData.length} loading={loading} error={error ? error.message : null} />
    </LayerWrapper>
  );
};

export default React.memo(Layer3);
