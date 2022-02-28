import { ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';
import { IDeviceNode } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { ApplicationTable } from './ApplicationTable';

interface ApplicationTabProps {
  dataItem: IDeviceNode;
}

export const ApplicationTab: React.FC<ApplicationTabProps> = props => {
  const { topology } = useTopologyV2DataContext();
  const links = topology.appAccessApiResponse.siteAccessInfo.links.filter(link => link.sourceId === props.dataItem.parentId);
  const applications: ISegmentSegmentP[] = links
    .map(link => {
      const maybeSegment = topology.originSegmentsData.find(itm => itm.id === link.destinationId);
      if (maybeSegment) {
        return maybeSegment;
      }
      return undefined;
    })
    .filter(item => item);
  return <ApplicationTable showLoader={false} data={applications} />;
};
