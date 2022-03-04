import { ITopologyQueryParam, toTimestamp } from 'lib/api/ApiModels/paramBuilders';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { AppAccessApiResponse, AppNodeType } from 'lib/api/ApiModels/Topology/apiModels';
import { useGet } from 'lib/api/http/useAxiosHook';
import { IDeviceNode } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { useContext, useEffect, useState } from 'react';
import { ApplicationTable, TrafficTableRowData } from './ApplicationTable';

interface ApplicationTabProps {
  dataItem: IDeviceNode;
}

export const ApplicationTab: React.FC<ApplicationTabProps> = props => {
  const { topology } = useTopologyV2DataContext();
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<AppAccessApiResponse>();
  const [rowData, setRowData] = useState<TrafficTableRowData[]>([]);

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
      const links = response.siteAccessInfo.links.filter(link => link.sourceId === props.dataItem.parentId);
      const data: TrafficTableRowData[] = [];
      links.forEach(link => {
        const maybeSegment = topology.originSegmentsData.find(itm => itm.id === link.destinationId);
        const appNodeInfo = response.siteAccessInfo.nodes.find(node => node.nodeId === link.destinationId && node.nodeType === AppNodeType.Application);
        let name: string = '';

        if (maybeSegment) {
          name = maybeSegment.name;
        }

        if (appNodeInfo) {
          appNodeInfo.members.forEach(member => {
            if (member.appNodeData.vnetworkExtid === props.dataItem.networkId && name) {
              const _traffic: TrafficTableRowData = {
                activeTime: member.appNodeData.activeTime,
                destination: member.name,
                flows: member.appNodeData.flows,
                name,
                recv: member.appNodeData.recv,
                sent: member.appNodeData.sent,
                protocol: member.appNodeData.protocol,
                port: member.appNodeData.port,
              };
              data.push(_traffic);
            }
          });
        }
      });
      setRowData(data);
    }
  }, [response]);

  const getAsyncData = (url: string, params: any) => {
    if (!url || !params) {
      return;
    }
    onGet(url, userContext.accessToken!, params);
  };
  return (
    <>
      {loading ? (
        <ApplicationTable error={error ? error.message : null} showLoader={loading} data={[]} />
      ) : (
        <ApplicationTable error={error ? error.message : null} showLoader={loading} data={rowData} />
      )}
    </>
  );
};
