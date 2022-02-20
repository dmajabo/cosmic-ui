import React from 'react';
import { TOPOLOGY_IDS } from '../model';
import { ContainerWithLegend, ContainerWithMetrics, StyledMap } from '../styles';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { useZoom } from '../hooks/useZoom';
import HeadeerAction from '../HeadeerAction';
import FilterComponent from '../PanelComponents/FilterComponent';
import VpcPanel from '../PanelComponents/NodePanels/VpcPanel';
import DevicePanel from '../PanelComponents/NodePanels/DevicePanel';
import WedgePanel from '../PanelComponents/NodePanels/WedgePanel';
import WebAclPanel from '../PanelComponents/NodePanels/WebAclPanel';
import GContainer from '../Containers/GContainer/GContainer';
import StructuresWrapper from '../Containers/Nodes/StructuresWrapper';
import DefsComponent from '../Containers/Shared/DefsComponent';
import { TopologyPanelTypes } from 'lib/hooks/Topology/models';
// import SegmentsLegend from '../Containers/SegmentsLegend';
import AccountNodeTopContainer from '../Containers/Nodes/NodeWrapper/AccountNode/AccountNodeTopContainer';
import RegionNodeTopContainer from '../Containers/Nodes/NodeWrapper/RegionNode/RegionNodeTopContainer';
import AccountNode from '../Containers/Nodes/NodeWrapper/AccountNode/AccountNode';
import RegionNode from '../Containers/Nodes/NodeWrapper/RegionNode/RegionNode';
import SiteNode from '../Containers/Nodes/NodeWrapper/SitesNode/SiteNode';
import SitesNodeTopContainer from '../Containers/Nodes/NodeWrapper/SitesNode/SitesNodeTopContainer';
import LinksWrapper from '../Containers/Links';
import ResizablePanel from 'app/components/Basic/PanelBar/ResizablePanel';
// import { STANDART_DISPLAY_RESOLUTION_V2 } from 'lib/models/general';
// import SegmentsComponent from '../PanelComponents/Segments/SegmentsComponent';

interface Props {
  disabledReload: boolean;
  onlyRefreshAvaible: any;
  isFullScreen: boolean;
  onReload: () => void;
  onOpenFullScreen: () => void;
}

const Graph: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const { transform, onZoomInit, onZoomIn, onZoomOut, onZoomChange, onCentered, onCenteredToNode, onUnsubscribe } = useZoom({
    pageId: TOPOLOGY_IDS.PAGE,
    svgId: TOPOLOGY_IDS.SVG,
    rootId: TOPOLOGY_IDS.G_ROOT,
  });

  React.useEffect(() => {
    if (!props.onlyRefreshAvaible) {
      onZoomInit();
    }
    return () => {
      onUnsubscribe();
    };
  }, [props.onlyRefreshAvaible]);

  React.useEffect(() => {
    if (topology.originData) {
      onCentered(topology.accounts, topology.sites, topology.regions);
      if (topology.selectedNode) {
        onCenteredToNode(topology.selectedNode, topology.topoPanelWidth);
      }
    }
  }, [topology.originData]);

  // const onOpenFullScreen = () => {
  //   props.onOpenFullScreen();
  // };

  const onHidePanel = () => {
    topology.onToogleTopoPanel(null, false);
  };

  const onUnselectNode = () => {
    topology.onUnselectNode();
  };

  const onPanelWidthChange = (w: number) => {
    onCenteredToNode(topology.selectedNode, w);
    topology.onPanelWidthChange(w);
  };

  return (
    <>
      <HeadeerAction
        disabledReload={props.disabledReload}
        onlyRefreshAvaible={props.onlyRefreshAvaible}
        transform={transform}
        isFullScreen={props.isFullScreen}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onZoomChange={onZoomChange}
        // onCentered={onCentered}
        // onOpenFullScreen={onOpenFullScreen}
        onRefresh={props.onReload}
      />
      {topology.originData && (
        <ContainerWithMetrics id={TOPOLOGY_IDS.PAGE}>
          <ContainerWithLegend>
            <StyledMap
              id={TOPOLOGY_IDS.SVG}
              width="100%"
              height="100%"
              // viewBox={`0 0 ${STANDART_DISPLAY_RESOLUTION_V2.width} ${STANDART_DISPLAY_RESOLUTION_V2.height}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              onDoubleClick={onUnselectNode}
            >
              <DefsComponent />
              <GContainer id={TOPOLOGY_IDS.G_ROOT}>
                {topology.accounts
                  ? Object.keys(topology.accounts).map(key => <AccountNodeTopContainer key={`nodeWrapperTopLayer${topology.accounts[key].uiId}`} account={topology.accounts[key]} />)
                  : null}
                {topology.sites ? Object.keys(topology.sites).map(key => <SitesNodeTopContainer key={`nodeWrapperTopLayer${topology.sites[key].uiId}`} site={topology.sites[key]} />) : null}
                {topology.regions ? Object.keys(topology.regions).map(key => <RegionNodeTopContainer key={`nodeWrapperTopLayer${topology.regions[key].uiId}`} region={topology.regions[key]} />) : null}

                {topology.links && Object.keys(topology.links).length ? <LinksWrapper links={topology.links} /> : null}
                {topology.accounts
                  ? Object.keys(topology.accounts).map(key => (
                      <AccountNode key={`accountChildren${topology.accounts[key].uiId}`} dataItem={topology.accounts[key]} onCenteredToNode={onCenteredToNode} />
                    ))
                  : null}
                {topology.sites
                  ? Object.keys(topology.sites).map(key => <SiteNode key={`siteChildrenLayer${topology.sites[key].uiId}`} dataItem={topology.sites[key]} onCenteredToNode={onCenteredToNode} />)
                  : null}
                {topology.regions
                  ? Object.keys(topology.regions).map(key => (
                      <RegionNode key={`regionChildrenLayer${topology.regions[key].uiId}`} dataItem={topology.regions[key]} onCenteredToNode={onCenteredToNode} />
                    ))
                  : null}
              </GContainer>
              {/* <line x1="50%" y1="0" x2="50%" y2="100%" fill="red" stroke="red" strokeWidth="1" />
              <line x1="0" y1="50%" x2="100%" y2="50%" fill="red" stroke="red" strokeWidth="1" /> */}
            </StyledMap>
            {/* {topology.originSegmentsData && topology.originSegmentsData.length ? <SegmentsLegend /> : null} */}
          </ContainerWithLegend>
          {topology.regionStructures && topology.regionStructures.length ? <StructuresWrapper nodes={topology.regionStructures} /> : null}
          <ResizablePanel show={topology.topoPanel.show} panelWidth={topology.topoPanelWidth} onHidePanel={onHidePanel} onPanelWidthChange={onPanelWidthChange}>
            {topology.topoPanel.type === TopologyPanelTypes.FILTERS && <FilterComponent />}
            {topology.topoPanel.type === TopologyPanelTypes.VPC && <VpcPanel dataItem={topology.topoPanel.dataItem} />}
            {topology.topoPanel.type === TopologyPanelTypes.WebAcl && <WebAclPanel dataItem={topology.topoPanel.dataItem} />}
            {topology.topoPanel.type === TopologyPanelTypes.Device && <DevicePanel dataItem={topology.topoPanel.dataItem} />}
            {topology.topoPanel.type === TopologyPanelTypes.Wedge && <WedgePanel dataItem={topology.topoPanel.dataItem} />}
          </ResizablePanel>
        </ContainerWithMetrics>
      )}
    </>
  );
};

export default React.memo(Graph);
