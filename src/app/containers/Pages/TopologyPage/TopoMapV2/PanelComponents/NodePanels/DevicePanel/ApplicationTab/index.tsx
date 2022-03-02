import { AppNodeType } from 'lib/api/ApiModels/Topology/apiModels';
import { IDeviceNode } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { ApplicationTable, TrafficTableRowData } from './ApplicationTable';

interface ApplicationTabProps {
  dataItem: IDeviceNode;
}

export const ApplicationTab: React.FC<ApplicationTabProps> = props => {
  const { topology } = useTopologyV2DataContext();
  const links = topology.appAccessApiResponse.siteAccessInfo.links.filter(link => link.sourceId === props.dataItem.parentId);
  const data: TrafficTableRowData[] = [];
  links.forEach(link => {
    const maybeSegment = topology.originSegmentsData.find(itm => itm.id === link.destinationId);
    const appNodeInfo = topology.appAccessApiResponse.siteAccessInfo.nodes.find(node => node.nodeId === link.destinationId && node.nodeType === AppNodeType.Application);
    let name: string,
      sent: string,
      recv: string,
      flows: string,
      activeTime: string,
      destinationName: string = '';

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
          };
          data.push(_traffic);
        }
      });
    }
  });
  return <ApplicationTable showLoader={false} data={data} />;
};
