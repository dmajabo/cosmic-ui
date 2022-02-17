import React, { useContext } from 'react';
import { IResourceQueryParam, ControllerKeyTypes, SecurityGroupsResourceTypes, IToposvcListSecurityGroupResponse, PolicyResKeyEnum, PolicyTableKeyEnum } from 'lib/api/ApiModels/Metrics/apiModel';
import { useGet } from 'lib/api/http/useAxiosHook';
import { getQueryResourceParam } from 'lib/api/ApiModels/Metrics/queryRoutesHelper';
import { toTimestamp } from 'lib/api/ApiModels/paramBuilders';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { INetworkVM } from 'lib/api/ApiModels/Topology/apiModels';
import { INetworkRule } from 'lib/api/ApiModels/Topology/apiModels';
import SimpleTable from 'app/components/Basic/Table/SimpleTable';
import { SecurityGroupTableGridColumns } from 'app/containers/Pages/PolicyPage/Page/Inventory/Panels/models';
import { IGridColumnField } from 'lib/models/grid';
import * as cellTemplates from 'app/components/Basic/Table/CellTemplates';

interface IProps {
  dataItem: INetworkVM;
}

const PolicyTab: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyV2DataContext();
  const { accessToken } = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<IToposvcListSecurityGroupResponse>();
  const [inboundData, setInData] = React.useState<INetworkRule[]>([]);
  const [outboundData, setOutData] = React.useState<INetworkRule[]>([]);
  const [inColumns] = React.useState<IGridColumnField[]>([
    { ...SecurityGroupTableGridColumns.extId },
    { ...SecurityGroupTableGridColumns.protocol, body: (d: INetworkRule) => cellTemplates.cellClassNameTemplate(d.ipProtocol, 'cellToUpperCase') },
    { ...SecurityGroupTableGridColumns.source, body: (d: INetworkRule) => cellTemplates.cellValueFromArrayTemplate(d.cidrs, 'name') },
    { ...SecurityGroupTableGridColumns.portRange, body: (d: INetworkRule) => cellTemplates.cellFrom_ToTemplate(d.fromPort, d.toPort, 'all') },
  ]);
  const [outColumns] = React.useState<IGridColumnField[]>([
    { ...SecurityGroupTableGridColumns.extId },
    { ...SecurityGroupTableGridColumns.protocol, body: (d: INetworkRule) => cellTemplates.cellClassNameTemplate(d.ipProtocol, 'cellToUpperCase') },
    { ...SecurityGroupTableGridColumns.destination, body: (d: INetworkRule) => cellTemplates.cellValueFromArrayTemplate(d.cidrs, 'name') },
    { ...SecurityGroupTableGridColumns.portRange, body: (d: INetworkRule) => cellTemplates.cellFrom_ToTemplate(d.fromPort, d.toPort, 'all') },
  ]);
  React.useEffect(() => {
    const _param: IResourceQueryParam = getQueryResourceParam(SecurityGroupsResourceTypes.Vm, props.dataItem.extId);
    if (topology.selectedTime) {
      _param.timestamp = toTimestamp(topology.selectedTime);
    }
    getDataAsync(TopoApi.getPolicyByKey(ControllerKeyTypes.SecurityGroups), _param);
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
    await onGet(url, accessToken!, params);
  };

  return (
    <>
      <SimpleTable
        id={`inbound${props.dataItem.extId}`}
        tableTitle={PolicyTableKeyEnum.Inbound}
        data={inboundData}
        columns={inColumns}
        loading={loading}
        error={error ? error.message : null}
        tableStyles={loading || !inboundData || !inboundData.length ? { height: '200px' } : null}
        styles={{ margin: '0 0 20px 0' }}
      />
      <SimpleTable
        id={`outbound${props.dataItem.extId}`}
        tableTitle={PolicyTableKeyEnum.Outbound}
        data={outboundData}
        tableStyles={loading || !outboundData || !outboundData.length ? { height: '200px' } : null}
        columns={outColumns}
        loading={loading}
        error={error ? error.message : null}
      />
    </>
  );
};

export default React.memo(PolicyTab);
