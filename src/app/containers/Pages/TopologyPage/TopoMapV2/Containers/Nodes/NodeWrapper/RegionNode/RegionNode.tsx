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
interface Props {
  dataItem: ITopoRegionNode;
}

const RegionNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();

  React.useEffect(() => {
    removeVnetTooltip(`${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}`);
    return () => removeVnetTooltip(`${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}`);
  }, []);

  const onVpcClick = (item: INetworkVNetNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.VPC, true, item);
  };

  const onWebAclClick = (item: INetworkWebAclNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.WebAcl, true, item);
  };

  return (
    <TransitionContainer
      id={`wrapper${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}childrensLayer`}
      stateIn={props.dataItem.visible && !props.dataItem.collapsed}
      origin="unset"
      transform="none"
      timing={50}
    >
      <g
        id={`${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}childrensLayer`}
        className="topologyNode"
        transform={`translate(${props.dataItem.x}, ${props.dataItem.y})`}
        data-type={NODES_CONSTANTS.REGION.type}
      >
        {topology.entities && topology.entities.web_acls.selected && props.dataItem.webAcls && props.dataItem.webAcls.length ? (
          <WebAclsContainer offsetY={NODES_CONSTANTS.REGION.headerHeight} offsetX={NODES_CONSTANTS.REGION.expanded.contentPadding}>
            <>
              {props.dataItem.webAcls.map(it => (
                <WebAclNode
                  key={`${it.uiId}webacl`}
                  item={it}
                  x={it.x}
                  y={it.y}
                  onClick={onWebAclClick}
                  nodeStyles={NODES_CONSTANTS.WEB_ACL.collapse}
                  counterStyles={NODES_CONSTANTS.WEB_ACL.countStyles}
                  labelStyles={NODES_CONSTANTS.WEB_ACL.labelHtmlStyles}
                />
              ))}
            </>
          </WebAclsContainer>
        ) : null}
        {topology.entities && topology.entities.peer_connections.selected && props.dataItem.peerConnections && props.dataItem.peerConnections.length ? (
          <PeerContainer
            headerHeight={NODES_CONSTANTS.REGION.headerHeight}
            showWebAcls={topology.entities && topology.entities.web_acls.selected}
            webAclTotalHeight={props.dataItem.webAclsRows.totalHeight}
            offsetX={NODES_CONSTANTS.REGION.expanded.contentPadding}
          >
            <>
              {props.dataItem.peerConnections.map(it => (
                <PeerConnectionNode
                  key={`${it.uiId}peerConnection`}
                  parentId={`wrapper${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}childrensLayer`}
                  x={it.x}
                  y={it.y}
                  item={it}
                  dataItem={props.dataItem}
                  nodeStyles={NODES_CONSTANTS.PEERING_CONNECTION.collapse}
                />
              ))}
            </>
          </PeerContainer>
        ) : null}

        <VpcContainer
          headerHeight={NODES_CONSTANTS.REGION.headerHeight}
          showWebAcls={topology.entities && topology.entities.web_acls.selected}
          webAclTotalHeight={props.dataItem.webAclsRows.totalHeight}
          showPeerConnections={topology.entities && topology.entities.peer_connections.selected}
          peerConnectionTotalHeight={props.dataItem.peerConnectionsRows.totalHeight}
          offsetX={NODES_CONSTANTS.REGION.expanded.contentPadding}
        >
          <>
            {props.dataItem.children.map(it => (
              <NetworkVnetNode key={`${it.uiId}vnet`} parentId={`${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}`} region={props.dataItem} item={it} onClick={onVpcClick} />
            ))}
          </>
        </VpcContainer>
        <VnetTooltipContainer
          id={`${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}`}
          showWebAcls={topology.entities && topology.entities.web_acls.selected}
          webAclTotalHeight={props.dataItem.webAclsRows.totalHeight}
          showPeerConnections={topology.entities && topology.entities.peer_connections.selected}
          peerConnectionTotalHeight={props.dataItem.peerConnectionsRows.totalHeight}
          offsetX={NODES_CONSTANTS.REGION.expanded.contentPadding}
        />
      </g>
    </TransitionContainer>
  );
};

export default React.memo(RegionNode);
