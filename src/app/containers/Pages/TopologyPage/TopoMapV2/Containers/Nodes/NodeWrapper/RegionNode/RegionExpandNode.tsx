import React from 'react';
// import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import NodeMarker from '../../Containers/NodeMarker';
import NodeExpandedName from '../../Containers/NodeName/NodeExpandedName';
import { FilterEntityOptions, INetworkVNetNode, INetworkWebAclNode, ITopoRegionNode } from 'lib/hooks/Topology/models';
import VnetTooltipContainer from '../../Containers/VnetTooltipContainer';
import NetworkVnetNode from '../NetworkVnetNode';
import PeerConnectionNode from '../PeerConnectionNode';
import WebAclNode from '../WebAclNode';
import PeerContainer from './ExpandNodeContent/PeerContainer';
import VpcContainer from './ExpandNodeContent/VpcContainer';
import WebAclsContainer from './ExpandNodeContent/WebAclsContainer';
import { getRegionChildrenContainersOffsets, IRefionContainersOffsets } from './ExpandNodeContent/helper';
import { removeVnetTooltip } from '../NetworkVnetNode/tooltipHelper';

interface Props {
  dragId: string;
  region: ITopoRegionNode;
  show: boolean;
  entities: FilterEntityOptions;
  onShowFullStructure: () => void;
  onWebAclClick: (item: INetworkWebAclNode) => void;
  onVpcClick: (item: INetworkVNetNode) => void;
}

const RegionExpandNode: React.FC<Props> = (props: Props) => {
  const [offsetsData, setOffsetsData] = React.useState<IRefionContainersOffsets>(null);

  React.useEffect(() => {
    removeVnetTooltip(`${NODES_CONSTANTS.REGION.type}${props.region.uiId}`);
    return () => removeVnetTooltip(`${NODES_CONSTANTS.REGION.type}${props.region.uiId}`);
  }, []);

  React.useEffect(() => {
    const _offsests = getRegionChildrenContainersOffsets(
      props.entities,
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
  }, [props.region, props.entities]);

  if (!offsetsData) return null;

  return (
    <g style={{ cursor: 'pointer' }} className="expandContainer">
      <rect
        id={props.dragId}
        fill={NODES_CONSTANTS.REGION.expanded.bgColor}
        width={props.region.expandedSize.width}
        height={props.region.expandedSize.height}
        rx={NODES_CONSTANTS.REGION.expanded.borderRadius}
        ry={NODES_CONSTANTS.REGION.expanded.borderRadius}
        pointerEvents="all"
      />
      <g transform="translate(0, 0)">
        <NodeMarker iconId={NODES_CONSTANTS.REGION.iconId} stylesObj={NODES_CONSTANTS.REGION.expanded.marker} />
        <NodeExpandedName
          name={props.region.dataItem.name}
          strBtnLabel="Open Region"
          nodeWidth={props.region.expandedSize.width}
          markerWidth={NODES_CONSTANTS.REGION.expanded.marker.width}
          height={NODES_CONSTANTS.REGION.expanded.marker.height}
          stylesObj={NODES_CONSTANTS.REGION.labelExpandedStyles}
          onClick={props.onShowFullStructure}
        />
      </g>
      <g id={`${NODES_CONSTANTS.REGION.type}${props.region.uiId}childrensLayer`} className="topologyNode" data-type={NODES_CONSTANTS.REGION.type}>
        {props.entities && props.entities.web_acls.selected && props.region.webAcls && props.region.webAcls.length ? (
          <WebAclsContainer offsetY={offsetsData.topOffset} offsetX={0}>
            <>
              {props.region.webAcls.map((row, ri) => {
                return row.map((it, i) => (
                  <WebAclNode
                    key={`${it.uiId}webacl`}
                    item={it}
                    x={it.x}
                    y={it.y}
                    onClick={props.onWebAclClick}
                    nodeStyles={NODES_CONSTANTS.WEB_ACL.collapse}
                    counterStyles={NODES_CONSTANTS.WEB_ACL.countStyles}
                    labelStyles={NODES_CONSTANTS.WEB_ACL.labelHtmlStyles}
                  />
                ));
              })}
            </>
          </WebAclsContainer>
        ) : null}
        {props.entities && props.entities.peer_connections.selected && props.region.peerConnections && props.region.peerConnections.length ? (
          <PeerContainer id={`peerLinkContainer${props.region.uiId}`} offsetY={offsetsData.topOffset + offsetsData.webAcl_TotalHeight} offsetX={0}>
            <>
              {props.region.peerConnections.map(row => {
                return row.map((it, i) => (
                  <PeerConnectionNode
                    key={`${it.uiId}peerConnection`}
                    regionUiId={`wrapper${NODES_CONSTANTS.REGION.type}${props.region.uiId}childrensLayer`}
                    offsetData={offsetsData}
                    x={it.x}
                    y={it.y}
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

        <VpcContainer id={`vnetContainer${props.region.uiId}`} offsetY={offsetsData.topOffset + offsetsData.webAcl_TotalHeight + offsetsData.peerConnection_TotalHeight} offsetX={0}>
          <>
            {props.region.children.map((row, ri) => {
              return row.map((it, i) => (
                <NetworkVnetNode key={`${it.uiId}vnet`} x={it.x} y={it.y} parentId={`${NODES_CONSTANTS.REGION.type}${props.region.uiId}`} region={props.region} item={it} onClick={props.onVpcClick} />
              ));
            })}
          </>
        </VpcContainer>
        <VnetTooltipContainer id={`${NODES_CONSTANTS.REGION.type}${props.region.uiId}`} offsetData={offsetsData} offsetX={NODES_CONSTANTS.REGION.expanded.contentPadding} />
      </g>
    </g>
  );
};

export default React.memo(RegionExpandNode);
