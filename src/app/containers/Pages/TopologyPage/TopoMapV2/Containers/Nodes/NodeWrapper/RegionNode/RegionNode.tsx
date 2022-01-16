import React from 'react';
import { INetworkVNetNode, INetworkWebAclNode, ITopoRegionNode } from 'lib/hooks/Topology/models';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import WebAclsContainer from './ExpandNodeContent/WebAclsContainer';
import NetworkVnetNode from '../NetworkVnetNode';
import PeerConnectionNode from '../PeerConnectionNode';
// import { onHoverNode, onUnHoverNode } from '../../../../Graph/helper';
import { TopologyPanelTypes } from 'lib/models/topology';
import { removeVnetTooltip } from '../NetworkVnetNode/tooltipHelper';
import TransitionContainer from '../../../TransitionContainer';
import WebAclNode from '../WebAclNode';
import PeerContainer from './ExpandNodeContent/PeerContainer';
import VpcContainer from './ExpandNodeContent/VpcContainer';
import VnetTooltipContainer from '../../Containers/VnetTooltipContainer';
import { getRegionChildrenContainersOffsets, IRefionContainersOffsets } from './ExpandNodeContent/helper';
interface Props {
  region: ITopoRegionNode;
}

const RegionNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const [offsetsData, setOffsetsData] = React.useState<IRefionContainersOffsets>(null);

  React.useEffect(() => {
    removeVnetTooltip(`${NODES_CONSTANTS.REGION.type}${props.region.uiId}`);
    return () => removeVnetTooltip(`${NODES_CONSTANTS.REGION.type}${props.region.uiId}`);
  }, []);

  React.useEffect(() => {
    const _offsests = getRegionChildrenContainersOffsets(
      topology.entities,
      props.region.webAcls.length,
      props.region.peerConnections.length,
      props.region.children.length,
      NODES_CONSTANTS.REGION.headerHeight,
      NODES_CONSTANTS.REGION.expanded.contentPadding,
      NODES_CONSTANTS.WEB_ACL.collapse,
      NODES_CONSTANTS.PEERING_CONNECTION.collapse,
      NODES_CONSTANTS.NETWORK_VNET.collapse,
      props.region.expandedSize.width,
    );
    setOffsetsData(_offsests);
  }, [props.region, topology.entities]);

  const onVpcClick = (item: INetworkVNetNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.VPC, true, item);
  };

  const onWebAclClick = (item: INetworkWebAclNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.WebAcl, true, item);
  };

  if (!offsetsData) return null;

  return (
    <TransitionContainer
      id={`wrapper${NODES_CONSTANTS.REGION.type}${props.region.uiId}childrensLayer`}
      stateIn={props.region.visible && !props.region.collapsed}
      origin="unset"
      transform="none"
      timing={50}
    >
      <g
        id={`${NODES_CONSTANTS.REGION.type}${props.region.uiId}childrensLayer`}
        className="topologyNode"
        transform={`translate(${props.region.x}, ${props.region.y})`}
        data-type={NODES_CONSTANTS.REGION.type}
      >
        {topology.entities && topology.entities.web_acls.selected && props.region.webAcls && props.region.webAcls.length ? (
          <WebAclsContainer offsetY={offsetsData.topOffset} offsetX={NODES_CONSTANTS.REGION.expanded.contentPadding}>
            <>
              {props.region.webAcls.map((row, ri) => {
                const rowWidth = row.length * (NODES_CONSTANTS.WEB_ACL.collapse.width + NODES_CONSTANTS.WEB_ACL.collapse.spaceX) - NODES_CONSTANTS.WEB_ACL.collapse.spaceX;
                const rowY = ri * (NODES_CONSTANTS.WEB_ACL.collapse.height + NODES_CONSTANTS.WEB_ACL.collapse.spaceY);
                const itemOffsetX = NODES_CONSTANTS.WEB_ACL.collapse.width + NODES_CONSTANTS.WEB_ACL.collapse.spaceX;
                return row.map((it, i) => (
                  <WebAclNode
                    key={`${it.uiId}webacl`}
                    item={it}
                    x={i * itemOffsetX}
                    y={rowY}
                    rowWidth={rowWidth}
                    nodeWidth={offsetsData.totalWidth}
                    onClick={onWebAclClick}
                    nodeStyles={NODES_CONSTANTS.WEB_ACL.collapse}
                    counterStyles={NODES_CONSTANTS.WEB_ACL.countStyles}
                    labelStyles={NODES_CONSTANTS.WEB_ACL.labelHtmlStyles}
                  />
                ));
              })}
            </>
          </WebAclsContainer>
        ) : null}
        {topology.entities && topology.entities.peer_connections.selected && props.region.peerConnections && props.region.peerConnections.length ? (
          <PeerContainer id={`peerLinkContainer${props.region.uiId}`} offsetY={offsetsData.topOffset + offsetsData.webAcl_TotalHeight} offsetX={NODES_CONSTANTS.REGION.expanded.contentPadding}>
            <>
              {props.region.peerConnections.map((row, ri) => {
                const rowWidth =
                  row.length * (NODES_CONSTANTS.PEERING_CONNECTION.collapse.width + NODES_CONSTANTS.PEERING_CONNECTION.collapse.spaceX) - NODES_CONSTANTS.PEERING_CONNECTION.collapse.spaceX;
                const rowY = ri * (NODES_CONSTANTS.PEERING_CONNECTION.collapse.height + NODES_CONSTANTS.PEERING_CONNECTION.collapse.spaceY);
                return row.map((it, i) => (
                  <PeerConnectionNode
                    key={`${it.uiId}peerConnection`}
                    regionUiId={`wrapper${NODES_CONSTANTS.REGION.type}${props.region.uiId}childrensLayer`}
                    offsetData={offsetsData}
                    x={i * (NODES_CONSTANTS.PEERING_CONNECTION.collapse.width + NODES_CONSTANTS.PEERING_CONNECTION.collapse.spaceX)}
                    y={rowY}
                    rowWidth={rowWidth}
                    item={it}
                    dataItem={props.region}
                    nodeStyles={NODES_CONSTANTS.PEERING_CONNECTION.collapse}
                    vnetCollapseStyles={NODES_CONSTANTS.NETWORK_VNET.collapse}
                  />
                ));
              })}
            </>
          </PeerContainer>
        ) : null}

        <VpcContainer
          id={`vnetContainer${props.region.uiId}`}
          offsetY={offsetsData.topOffset + offsetsData.webAcl_TotalHeight + offsetsData.peerConnection_TotalHeight}
          offsetX={NODES_CONSTANTS.REGION.expanded.contentPadding}
        >
          <>
            {props.region.children.map((row, ri) => {
              const rowWidth = row.length * (NODES_CONSTANTS.NETWORK_VNET.collapse.width + NODES_CONSTANTS.NETWORK_VNET.collapse.spaceX) - NODES_CONSTANTS.NETWORK_VNET.collapse.spaceX;
              const rowY = ri * (NODES_CONSTANTS.NETWORK_VNET.collapse.height + NODES_CONSTANTS.NETWORK_VNET.collapse.spaceY);
              return row.map((it, i) => (
                <NetworkVnetNode
                  key={`${it.uiId}vnet`}
                  x={i * (NODES_CONSTANTS.NETWORK_VNET.collapse.width + NODES_CONSTANTS.NETWORK_VNET.collapse.spaceX)}
                  y={rowY}
                  rowWidth={rowWidth}
                  nodeWidth={offsetsData.totalWidth}
                  parentId={`${NODES_CONSTANTS.REGION.type}${props.region.uiId}`}
                  region={props.region}
                  item={it}
                  onClick={onVpcClick}
                />
              ));
            })}
          </>
        </VpcContainer>
        <VnetTooltipContainer id={`${NODES_CONSTANTS.REGION.type}${props.region.uiId}`} offsetData={offsetsData} offsetX={NODES_CONSTANTS.REGION.expanded.contentPadding} />
      </g>
    </TransitionContainer>
  );
};

export default React.memo(RegionNode);
