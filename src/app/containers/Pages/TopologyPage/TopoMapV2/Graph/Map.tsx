import React from 'react';
import GContainer from '../Containers/GContainer/GContainer';
import TopologyLink from '../Containers/Links/TopologyLink';
import { TOPOLOGY_IDS } from '../model';
import { StyledMap } from '../styles';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import NodeWrapper from '../Containers/Nodes/NodeWrapper';
import DefsComponent from '../Containers/Shared/DefsComponent';
import { STANDART_DISPLAY_RESOLUTION_V2 } from 'lib/models/general';
import StructuresWrapper from '../Containers/Nodes/StructuresWrapper';
interface Props {}

const Map: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();

  return (
    <>
      <StyledMap
        id={TOPOLOGY_IDS.SVG}
        width="100%"
        height="100%"
        viewBox={`0 0 ${STANDART_DISPLAY_RESOLUTION_V2.width} ${STANDART_DISPLAY_RESOLUTION_V2.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <DefsComponent />
        <GContainer id={TOPOLOGY_IDS.G_ROOT}>
          {topology && (
            <>
              <g id="nodesContainerTopLayer">
                <NodeWrapper isTopLayer nodes={topology.nodes} />
              </g>
              <g id="linkContainer">
                <TopologyLink links={topology.links} />
              </g>
              <g id="nodesContainer">
                <NodeWrapper nodes={topology.nodes} />
              </g>
              <g id="regionStructuresContainer">
                <StructuresWrapper nodes={topology.regionStructures} />
              </g>
            </>
          )}
        </GContainer>
      </StyledMap>
    </>
  );
};

export default React.memo(Map);
