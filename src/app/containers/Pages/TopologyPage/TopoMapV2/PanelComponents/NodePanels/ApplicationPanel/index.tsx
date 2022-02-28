import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { ITopoAppNode } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { PanelHeader, PanelTitle, SubPanelTitle } from '../../styles';
import MemberTable from './MemberTable';
import SiteTable from './SiteTable';

interface ApplicationPanelProps {
  dataItem: ITopoAppNode;
}

export const ApplicationPanel: React.FC<ApplicationPanelProps> = props => {
  const { topology } = useTopologyV2DataContext();
  const siteNames = topology.appAccessApiResponse.siteAccessInfo.links
    .filter(link => link.destinationId === props.dataItem.dataItem.nodeId)
    .map(link => {
      return topology.sites[link.sourceId].dataItem.name;
    });
  const node = topology.appAccessApiResponse.siteAccessInfo.nodes.find(node => node.nodeId === props.dataItem.dataItem.nodeId);
  const members = node ? node.members.map(member => member.name) : [];

  return (
    <>
      <PanelHeader direction="column" align="unset">
        <PanelTitle>{props.dataItem.dataItem.name ? props.dataItem.dataItem.name : props.dataItem.dataItem.extId}</PanelTitle>
      </PanelHeader>

      <OverflowContainer>
        <SubPanelTitle style={{ marginBottom: '30px' }}>Sites</SubPanelTitle>
        <SiteTable showLoader={false} data={siteNames} />
        <SubPanelTitle style={{ marginBottom: '30px' }}>Members</SubPanelTitle>
        <MemberTable showLoader={false} data={members} />
      </OverflowContainer>
    </>
  );
};
