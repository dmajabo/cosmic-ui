import { ITopologyQueryParam, toTimestamp } from 'lib/api/ApiModels/paramBuilders';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { AppAccessApiResponse, AppNodeType } from 'lib/api/ApiModels/Topology/apiModels';
import { useGet } from 'lib/api/http/useAxiosHook';
import { ITopoAppNode } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { useContext, useEffect, useState } from 'react';
import MemberTable, { MemberRow } from '../MemberTable';

interface TrafficTabProps {
  dataItem: ITopoAppNode;
}

export const TrafficTab: React.FC<TrafficTabProps> = props => {
  const { topology } = useTopologyV2DataContext();
  const [rowData, setRowData] = useState<MemberRow[]>([]);
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<AppAccessApiResponse>();

  useEffect(() => {
    const params: ITopologyQueryParam = { timestamp: null, exclAppMembers: false };

    if (topology.selectedTime) {
      params.timestamp = toTimestamp(topology.selectedTime);
      params.startTime = toTimestamp(topology.selectedTime);
    }
    getAsyncData(TelemetryApi.getAppAccess(), params);
  }, [props.dataItem, topology.selectedTime]);

  useEffect(() => {
    if (response && response.siteAccessInfo) {
      const node = response.siteAccessInfo.nodes.find(node => node.nodeId === props.dataItem.dataItem?.nodeId && node.nodeType === AppNodeType.Application);
      const members: MemberRow[] = node
        ? node.members.map(member => {
            return {
              activeTime: member.appNodeData.activeTime,
              clients: member.appNodeData.clients,
              flows: member.appNodeData.flows,
              port: member.appNodeData.port,
              protocol: member.appNodeData.protocol,
              recv: member.appNodeData.recv,
              sent: member.appNodeData.sent,
              name: member.name,
              vnetworkName: member.appNodeData.vnetworkName,
              vnetworkExtid: member.appNodeData.vnetworkExtid,
            };
          })
        : [];
      setRowData(members);
    }
  }, [response]);
  const getAsyncData = (url: string, params: any) => {
    if (!url || !params) {
      return;
    }
    onGet(url, userContext.accessToken!, params);
  };
  return (
    <>{loading ? <MemberTable showLoader={loading} error={error ? error.message : null} data={[]} /> : <MemberTable showLoader={loading} error={error ? error.message : null} data={rowData} />}</>
  );
};
