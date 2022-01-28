import React from 'react';
import { ITopoRegionNode, INetworkVNetNode, INetworkWebAclNode, TopologyPanelTypes } from 'lib/hooks/Topology/models';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
// import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import {} from 'lib/hooks/Topology/models';
import NetworkVnetNode from '../NetworkVnetNode';
import PeerConnectionNode from '../PeerConnectionNode';
import WebAclNode from '../WebAclNode';

interface Props {
  dataItem: ITopoRegionNode;
}

const RegionNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();

  const onVpcClick = (item: INetworkVNetNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.VPC, true, item);
  };

  const onWebAclClick = (item: INetworkWebAclNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.WebAcl, true, item);
  };

  if (!props.dataItem.visible || props.dataItem.collapsed) return null;
  return (
    <g id={`${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}childrensLayer`} className="topologyNode" data-type={NODES_CONSTANTS.REGION.type}>
      <>
        {topology.entities && topology.entities.web_acls && topology.entities.web_acls.selected && props.dataItem.webAcls && props.dataItem.webAcls.length ? (
          <>
            {props.dataItem.webAcls.map((row, ri) => {
              return row.map((it, i) => (
                <WebAclNode
                  key={`${it.uiId}webacl`}
                  parentId={`${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}childrensLayer`}
                  item={it}
                  onClick={onWebAclClick}
                  nodeStyles={NODES_CONSTANTS.WEB_ACL.collapse}
                  counterStyles={NODES_CONSTANTS.WEB_ACL.countStyles}
                  labelStyles={NODES_CONSTANTS.WEB_ACL.labelHtmlStyles}
                />
              ));
            })}
          </>
        ) : null}
        {topology.entities && topology.entities.peer_connections && topology.entities.peer_connections.selected && props.dataItem.peerConnections && props.dataItem.peerConnections.length ? (
          <>
            {props.dataItem.peerConnections.map(row => {
              return row.map((it, i) => (
                <PeerConnectionNode
                  key={`${it.uiId}peerConnection`}
                  parentId={`${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}childrensLayer`}
                  item={it}
                  dataItem={props.dataItem}
                  nodeStyles={NODES_CONSTANTS.PEERING_CONNECTION.collapse}
                  vnetCollapseStyles={NODES_CONSTANTS.NETWORK_VNET.collapse}
                />
              ));
            })}
          </>
        ) : null}

        {topology.entities && topology.entities.vpc && topology.entities.vpc.selected && props.dataItem.children && props.dataItem.children.length ? (
          <>
            {props.dataItem.children.map((row, ri) => {
              return row.map((it, i) => (
                <NetworkVnetNode key={`${it.uiId}vnet`} parentId={`${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}childrensLayer`} region={props.dataItem} item={it} onClick={onVpcClick} />
              ));
            })}
          </>
        ) : null}
      </>
    </g>
  );
};

export default React.memo(RegionNode);
