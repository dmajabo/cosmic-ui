import { INetworkVNetNode, INetworkWebAclNode, ITopoRegionNode } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { STANDART_DISPLAY_RESOLUTION_V2 } from 'lib/models/general';
import { TopologyPanelTypes } from 'lib/models/topology';
import React from 'react';
import { NODES_CONSTANTS } from '../../../model';
import ExpandedNetworkVnetNode from '../NodeWrapper/NetworkVnetNode/ExpandedNetworkVnetNode';
import PeerConnectionNode from '../NodeWrapper/PeerConnectionNode';
import { getRegionChildrenContainersOffsets, IRefionContainersOffsets } from '../NodeWrapper/RegionNode/ExpandNodeContent/helper';
import PeerContainer from '../NodeWrapper/RegionNode/ExpandNodeContent/PeerContainer';
import VpcContainer from '../NodeWrapper/RegionNode/ExpandNodeContent/VpcContainer';
import WebAclsContainer from '../NodeWrapper/RegionNode/ExpandNodeContent/WebAclsContainer';
import WebAclNode from '../NodeWrapper/WebAclNode';

interface Props {
  region: ITopoRegionNode;
}

const StructureNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const [offsetsData, setOffsetsData] = React.useState<IRefionContainersOffsets>(null);

  React.useEffect(() => {
    const _offsests = getRegionChildrenContainersOffsets(
      topology.entities,
      props.region.webAcls.length,
      props.region.peerConnections.length,
      props.region.children.length,
      0,
      NODES_CONSTANTS.REGION.expanded.contentPadding,
      NODES_CONSTANTS.WEB_ACL.structureStyles.nodeStyles,
      NODES_CONSTANTS.PEERING_CONNECTION.structureStyles.nodeStyles,
      NODES_CONSTANTS.NETWORK_VNET.expanded,
      STANDART_DISPLAY_RESOLUTION_V2.width - 80,
      true,
    );
    setOffsetsData(_offsests);
  }, [props.region]);

  const onVpcClick = (item: INetworkVNetNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.VPC, true, item);
  };

  const onWebAclClick = (item: INetworkWebAclNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.WebAcl, true, item);
  };

  if (!offsetsData) return null;

  return (
    <g id={`wrapper${NODES_CONSTANTS.REGION.type}${props.region.uiId}structure`}>
      {props.region.webAcls && props.region.webAcls.length ? (
        <WebAclsContainer offsetY={offsetsData.topOffset}>
          <>
            {props.region.webAcls.map((row, ri) => {
              const rowY = ri * (NODES_CONSTANTS.WEB_ACL.structureStyles.nodeStyles.height + NODES_CONSTANTS.WEB_ACL.structureStyles.nodeStyles.spaceY);
              return row.map(it => (
                <WebAclNode
                  key={`${it.uiId}webacl`}
                  item={it}
                  x={
                    it.childIndex * (NODES_CONSTANTS.WEB_ACL.structureStyles.nodeStyles.width + NODES_CONSTANTS.WEB_ACL.structureStyles.nodeStyles.spaceX) +
                    offsetsData.totalWidth / 2 -
                    it.itemsInRow * (NODES_CONSTANTS.WEB_ACL.structureStyles.nodeStyles.width + NODES_CONSTANTS.WEB_ACL.structureStyles.nodeStyles.spaceX) -
                    NODES_CONSTANTS.WEB_ACL.structureStyles.nodeStyles.spaceX
                  }
                  y={rowY}
                  onClick={onWebAclClick}
                  nodeStyles={NODES_CONSTANTS.WEB_ACL.structureStyles.nodeStyles}
                  counterStyles={NODES_CONSTANTS.WEB_ACL.structureStyles.countStyles}
                  labelStyles={NODES_CONSTANTS.WEB_ACL.structureStyles.labelHtmlStyles}
                />
              ));
            })}
          </>
        </WebAclsContainer>
      ) : null}
      {props.region.peerConnections && props.region.peerConnections.length ? (
        <PeerContainer id={`peerLinkContainerStructure${NODES_CONSTANTS.REGION.type}${props.region.uiId}`} offsetY={offsetsData.topOffset + offsetsData.webAcl_TotalHeight}>
          <>
            {props.region.peerConnections.map((row, ri) => {
              const rowY = ri * (NODES_CONSTANTS.PEERING_CONNECTION.structureStyles.nodeStyles.height + NODES_CONSTANTS.PEERING_CONNECTION.structureStyles.nodeStyles.spaceY);
              return row.map((it, i) => (
                <PeerConnectionNode
                  key={`${it.uiId}peerConnection`}
                  regionUiId={`wrapper${NODES_CONSTANTS.REGION.type}${props.region.uiId}structure`}
                  offsetData={offsetsData}
                  item={it}
                  x={it.childIndex * (NODES_CONSTANTS.PEERING_CONNECTION.structureStyles.nodeStyles.width + NODES_CONSTANTS.PEERING_CONNECTION.structureStyles.nodeStyles.spaceX)}
                  y={rowY}
                  dataItem={props.region}
                  showLabel
                  labelStyles={NODES_CONSTANTS.PEERING_CONNECTION.structureStyles.labelHtmlStyles}
                  nodeStyles={NODES_CONSTANTS.PEERING_CONNECTION.structureStyles.nodeStyles}
                  vnetExpandStyles={NODES_CONSTANTS.NETWORK_VNET.expanded}
                  isStructure
                />
              ));
            })}
          </>
        </PeerContainer>
      ) : null}

      <VpcContainer id={`vnetContainerStructure${props.region.uiId}`} offsetY={offsetsData.topOffset + offsetsData.webAcl_TotalHeight + offsetsData.peerConnection_TotalHeight}>
        <>
          {props.region.children.map((row, ri) => {
            const rowWidth = row.length * (NODES_CONSTANTS.NETWORK_VNET.expanded.minWidth + NODES_CONSTANTS.NETWORK_VNET.expanded.spaceX) - NODES_CONSTANTS.NETWORK_VNET.expanded.spaceX;
            const rowY = ri * (NODES_CONSTANTS.NETWORK_VNET.expanded.minHeight + NODES_CONSTANTS.NETWORK_VNET.expanded.spaceY);
            return row.map((it, i) => (
              <ExpandedNetworkVnetNode
                key={`${it.uiId}vnet`}
                rowWidth={rowWidth}
                nodeWidth={offsetsData.totalWidth}
                x={i * (NODES_CONSTANTS.NETWORK_VNET.expanded.minWidth + NODES_CONSTANTS.NETWORK_VNET.expanded.spaceX)}
                y={rowY}
                parentId={`${NODES_CONSTANTS.REGION.type}${props.region.uiId}`}
                region={props.region}
                item={it}
                onClick={onVpcClick}
              />
            ));
          })}
        </>
      </VpcContainer>
    </g>
  );
};

export default React.memo(StructureNode);
