import React from 'react';
import GContainer from '../Containers/GContainer/GContainer';
import TopologyLink from '../Containers/Links/TopologyLink';
import { TOPOLOGY_IDS } from '../model';
import { StyledMap } from '../styles';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import NodeWrapper from '../Containers/Nodes/NodeWrapper';
import DefsComponent from '../Containers/Shared/DefsComponent';
import { STANDART_DISPLAY_RESOLUTION_V2 } from 'lib/models/general';
import { IVPC_PanelDataNode, TopologyPanelTypes } from 'lib/models/topology';
import { IDeviceNode, ITGWNode } from 'lib/hooks/Topology/models';
// import useResizeAware from 'react-resize-aware';
interface Props {}

const Map: React.FC<Props> = (props: Props) => {
  // const [resizeListener, sizes] = useResizeAware();
  const { topology } = useTopologyV2DataContext();

  const onClickVpc = (_data: IVPC_PanelDataNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.VPC, true, _data);
  };
  const onClickDevice = (dev: IDeviceNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.Device, true, dev);
  };
  const onClickWedge = (wedge: ITGWNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.Wedge, true, wedge);
  };
  return (
    <>
      {/* {resizeListener} */}
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
              <g id="nodesContainer">
                {topology.nodes &&
                  topology.nodes.length &&
                  topology.nodes.map(it => <NodeWrapper key={`node${it.uiId}`} dataItem={it} onClickVpc={onClickVpc} onClickDevice={onClickDevice} onClickWedge={onClickWedge} />)}
              </g>
              <g id="linkContainer">{topology.links && topology.links.length && topology.links.map((link, index) => <TopologyLink dataItem={link} key={`link${link.id}${index}`} />)}</g>
            </>
          )}
        </GContainer>
      </StyledMap>
    </>
  );
};

export default React.memo(Map);
