import { ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';
import { IDeviceNode } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { ApplicationTable, TrafficTableRowData } from './ApplicationTable';

interface ApplicationTabProps {
  dataItem: IDeviceNode;
}

export const ApplicationTab: React.FC<ApplicationTabProps> = props => {
  const { topology } = useTopologyV2DataContext();
  const links = topology.appAccessApiResponse.siteAccessInfo.links.filter(link => link.sourceId === props.dataItem.parentId);
  const data: TrafficTableRowData[] = links.map(link => {
    const maybeSegment = topology.originSegmentsData.find(itm => itm.id === link.destinationId);
    const appNodeInfo = topology.appAccessApiResponse.siteAccessInfo.nodes.find(node => node.nodeId === link.destinationId);

    if (maybeSegment && appNodeInfo) {
      return {
        name: '',
        sent: '',
        recv: '',
        flows: '',
        activeTime: '',
      };
    }
    return {
      name: '',
      sent: '',
      recv: '',
      flows: '',
      activeTime: '',
    };
  });
  return <ApplicationTable showLoader={false} data={data} />;
};
