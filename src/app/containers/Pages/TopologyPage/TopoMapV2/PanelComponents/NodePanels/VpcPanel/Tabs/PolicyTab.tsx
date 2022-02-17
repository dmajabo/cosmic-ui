import React from 'react';
import { INetworkVNetNode } from 'lib/hooks/Topology/models';
import { IToposvcListSecurityGroupResponse, IResourceQueryParam, SecurityGroupsResourceTypes, ControllerKeyTypes, PolicyResKeyEnum, PolicyTableKeyEnum } from 'lib/api/ApiModels/Metrics/apiModel';
import { getQueryResourceParam } from 'lib/api/ApiModels/Metrics/queryRoutesHelper';
import { toTimestamp } from 'lib/api/ApiModels/paramBuilders';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { useGet } from 'lib/api/http/useAxiosHook';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { INetworkRule } from 'lib/api/ApiModels/Topology/apiModels';
import { SecurityGroupTableGridColumns } from 'app/containers/Pages/PolicyPage/Page/Inventory/Panels/models';
import { IGridColumnField } from 'lib/models/grid';
import * as cellTemplates from 'app/components/Basic/Table/CellTemplates';
import SimpleTable from 'app/components/Basic/Table/SimpleTable';

interface Props {
  dataItem: INetworkVNetNode;
}

const PolicyTab: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const userContext = React.useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<IToposvcListSecurityGroupResponse>();
  const [inData, setInData] = React.useState<INetworkRule[]>([]);
  const [outData, setOutData] = React.useState<INetworkRule[]>([]);
  const [inColumns] = React.useState<IGridColumnField[]>([
    { ...SecurityGroupTableGridColumns.extId },
    { ...SecurityGroupTableGridColumns.protocol, body: (d: INetworkRule) => cellTemplates.cellClassNameTemplate(d.ipProtocol, 'cellToUpperCase') },
    { ...SecurityGroupTableGridColumns.source, body: (d: INetworkRule) => cellTemplates.cellValueFromArrayTemplate(d.cidrs, 'name') },
    { ...SecurityGroupTableGridColumns.portRange, body: (d: INetworkRule) => cellTemplates.cellFrom_ToTemplate(d.fromPort, d.toPort) },
  ]);
  const [outColumns] = React.useState<IGridColumnField[]>([
    { ...SecurityGroupTableGridColumns.extId },
    { ...SecurityGroupTableGridColumns.protocol, body: (d: INetworkRule) => cellTemplates.cellClassNameTemplate(d.ipProtocol, 'cellToUpperCase') },
    { ...SecurityGroupTableGridColumns.destination, body: (d: INetworkRule) => cellTemplates.cellValueFromArrayTemplate(d.cidrs, 'name') },
    { ...SecurityGroupTableGridColumns.portRange, body: (d: INetworkRule) => cellTemplates.cellFrom_ToTemplate(d.fromPort, d.toPort) },
  ]);
  React.useEffect(() => {
    const _param: IResourceQueryParam = getQueryResourceParam(SecurityGroupsResourceTypes.VNetwork, props.dataItem.extId);
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
    await onGet(url, userContext.accessToken!, params);
  };

  return (
    <>
      <SimpleTable
        id={`inbound${props.dataItem.extId}`}
        tableTitle={PolicyTableKeyEnum.Inbound}
        data={inData}
        columns={inColumns}
        loading={loading}
        error={error ? error.message : null}
        tableStyles={loading || !inData || !inData.length ? { height: '200px' } : null}
        styles={{ margin: '0 0 20px 0' }}
      />
      <SimpleTable
        id={`outbound${props.dataItem.extId}`}
        tableTitle={PolicyTableKeyEnum.Outbound}
        data={outData}
        tableStyles={loading || !outData || !outData.length ? { height: '200px' } : null}
        columns={outColumns}
        loading={loading}
        error={error ? error.message : null}
      />
    </>
  );
};
export default React.memo(PolicyTab);
