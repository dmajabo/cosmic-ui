import React, { useContext } from 'react';
import { IResourceQueryParam, ControllerKeyTypes, SecurityGroupsResourceTypes, IToposvcListSecurityGroupResponse, PolicyResKeyEnum } from 'lib/api/ApiModels/Metrics/apiModel';
import { INetworkRule } from 'lib/api/ApiModels/Topology/apiModels';
import PolicyTable from './PolicyTable';
import { useGet } from 'lib/api/http/useAxiosHook';
import { getQueryResourceParam } from 'lib/api/ApiModels/Metrics/queryRoutesHelper';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { toTimestamp } from 'lib/api/ApiModels/paramBuilders';
import { IDeviceNode } from 'lib/hooks/Topology/models';
import { TableHeaderStyles } from 'app/components/Basic/Table/styles';
import { RuleTableContainer } from './styles';
import LoadingIndicator from 'app/components/Loading';

interface IProps {
  dataItem: IDeviceNode;
}

const PolicyTab: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyV2DataContext();
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<IToposvcListSecurityGroupResponse>();
  const [inboundData, setInboundData] = React.useState<INetworkRule[]>([]);
  const [outboundData, setOutboundData] = React.useState<INetworkRule[]>([]);
  const [cellularData, setCellularData] = React.useState<INetworkRule[]>([]);

  React.useEffect(() => {
    const _param: IResourceQueryParam = getQueryResourceParam(SecurityGroupsResourceTypes.VNetwork, props.dataItem.vnetworks[0].extId);
    if (topology.selectedTime) {
      _param.timestamp = toTimestamp(topology.selectedTime);
    }
    getDataAsync(TopoApi.getPolicyByKey(ControllerKeyTypes.SecurityGroups), _param);
  }, [props.dataItem, topology.selectedTime]);

  React.useEffect(() => {
    if (response !== null && response[PolicyResKeyEnum.SecurityGroups] !== undefined) {
      const _inboundData = [];
      const _outboundData = [];
      const _cellularData = [];
      response[PolicyResKeyEnum.SecurityGroups].forEach(it => {
        if (!it.rules || !it.rules.length) {
          return;
        }
        it.rules.forEach(rule => {
          if (rule.ruleType === 'l3_inbound') {
            _inboundData.push(rule);
          } else if (rule.ruleType === 'l3_outbound') {
            _outboundData.push(rule);
          } else {
            _cellularData.push(rule);
          }
        });
      });
      setInboundData(_inboundData);
      setOutboundData(_outboundData);
      setCellularData(_cellularData);
    }
  }, [response]);

  const getDataAsync = (url: string, params: any) => {
    if (!url || !params) {
      return;
    }
    onGet(url, userContext.accessToken!, params);
  };
  // title={PolicyTableKeyEnum.Inbound}
  return loading && !inboundData.length && !outboundData.length && !cellularData.length ? (
    <>
      <RuleTableContainer>
        <TableHeaderStyles>Inbound Rules</TableHeaderStyles>
        <PolicyTable styles={{ margin: '0 0 20px 0', flexDirection: 'column' }} data={[]} showLoader={loading} />
      </RuleTableContainer>
      <RuleTableContainer>
        <TableHeaderStyles>Outbound Rules</TableHeaderStyles>
        <PolicyTable styles={{ margin: '0 0 20px 0', flexDirection: 'column' }} data={[]} showLoader={loading} />
      </RuleTableContainer>
      <RuleTableContainer>
        <TableHeaderStyles>Cellular Rules</TableHeaderStyles>
        <PolicyTable styles={{ margin: '0 0 20px 0', flexDirection: 'column' }} data={[]} showLoader={loading} />
      </RuleTableContainer>
    </>
  ) : (
    <>
      <RuleTableContainer style={{ display: inboundData.length ? '' : 'none' }}>
        <TableHeaderStyles>Inbound Rules</TableHeaderStyles>
        <PolicyTable styles={{ margin: '0 0 20px 0', flexDirection: 'column' }} data={inboundData} showLoader={loading} error={error ? error.message : null} />
      </RuleTableContainer>
      <RuleTableContainer style={{ display: outboundData.length ? '' : 'none' }}>
        <TableHeaderStyles>Outbound Rules</TableHeaderStyles>
        <PolicyTable styles={{ margin: '0 0 20px 0', flexDirection: 'column' }} data={outboundData} showLoader={loading} error={error ? error.message : null} />
      </RuleTableContainer>
      <RuleTableContainer style={{ display: cellularData.length ? '' : 'none' }}>
        <TableHeaderStyles>Cellular Rules</TableHeaderStyles>
        <PolicyTable styles={{ margin: '0 0 20px 0', flexDirection: 'column' }} data={cellularData} showLoader={loading} error={error ? error.message : null} />
      </RuleTableContainer>
    </>
  );
};

export default React.memo(PolicyTab);
