import React from 'react';
// import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import NodeMarker from '../../Containers/NodeMarker';
import NodeExpandedName from '../../Containers/NodeName/NodeExpandedName';
import { INetworkVNetNode, INetworkWebAclNode, ITopoRegionNode } from 'lib/hooks/Topology/models';
import VnetTooltipContainer from '../../Containers/VnetTooltipContainer';
import NetworkVnetNode from '../NetworkVnetNode';
import PeerConnectionNode from '../PeerConnectionNode';
import WebAclNode from '../WebAclNode';
import PeerContainer from './ExpandNodeContent/PeerContainer';
import VpcContainer from './ExpandNodeContent/VpcContainer';
import WebAclsContainer from './ExpandNodeContent/WebAclsContainer';
import { IRefionContainersOffsets } from './ExpandNodeContent/helper';
import { removeVnetTooltip } from '../NetworkVnetNode/tooltipHelper';
import TransitionContainer from '../../../TransitionContainer';
import NetworkNetworkLink from '../../../Links/NetworkNetworkLink';

interface Props {
  x: number;
  y: number;
  dragId: string;
  region: ITopoRegionNode;
  show: boolean;
  offsetsData: IRefionContainersOffsets;
  showPeerConnections: boolean;
  showWebAcls: boolean;
  showTransits: boolean;
  onShowFullStructure: () => void;
  onWebAclClick: (item: INetworkWebAclNode) => void;
  onVpcClick: (item: INetworkVNetNode) => void;
}

const RegionExpandNode: React.FC<Props> = (props: Props) => {
  React.useEffect(() => {
    removeVnetTooltip(`${NODES_CONSTANTS.REGION.type}${props.region.uiId}`);
    return () => removeVnetTooltip(`${NODES_CONSTANTS.REGION.type}${props.region.uiId}`);
  }, []);

  return (
    <>
      <g
        style={{ cursor: 'pointer' }}
        className="topologyNode"
        id={`${NODES_CONSTANTS.REGION.type}${props.region.uiId}`}
        transform={`translate(${props.x}, ${props.y})`}
        data-type={NODES_CONSTANTS.REGION.type}
      >
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
      </g>
      {props.region.vnetLinks && props.region.vnetLinks.length ? (
        <TransitionContainer stateIn={props.showTransits} origin="unset" transform="none">
          <>
            {props.region.vnetLinks.map(it => (
              <NetworkNetworkLink key={`link${NODES_CONSTANTS.REGION.type}${props.region.uiId}${it.id}`} dataItem={it} offsetY={props.offsetsData.vnetOffsetY} />
            ))}
          </>
        </TransitionContainer>
      ) : null}
      <g id={`${NODES_CONSTANTS.REGION.type}${props.region.uiId}childrensLayer`} className="topologyNode" data-type={NODES_CONSTANTS.REGION.type} transform={`translate(${props.x}, ${props.y})`}>
        {props.showWebAcls && props.region.webAcls && props.region.webAcls.length ? (
          <WebAclsContainer offsetY={props.offsetsData.topOffset}>
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
        {props.showPeerConnections && props.region.peerConnections && props.region.peerConnections.length ? (
          <PeerContainer id={`peerLinkContainer${props.region.uiId}`} offsetY={props.offsetsData.topOffset + props.offsetsData.webAcl_TotalHeight}>
            <>
              {props.region.peerConnections.map(row => {
                return row.map((it, i) => (
                  <PeerConnectionNode
                    key={`${it.uiId}peerConnection`}
                    regionUiId={`${NODES_CONSTANTS.REGION.type}${props.region.uiId}childrensLayer`}
                    offsetData={props.offsetsData}
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

        <VpcContainer id={`vnetContainer${props.region.uiId}`} offsetY={props.offsetsData.topOffset + props.offsetsData.webAcl_TotalHeight + props.offsetsData.peerConnection_TotalHeight}>
          <>
            {props.region.children.map((row, ri) => {
              return row.map((it, i) => (
                <NetworkVnetNode key={`${it.uiId}vnet`} x={it.x} y={it.y} parentId={`${NODES_CONSTANTS.REGION.type}${props.region.uiId}`} region={props.region} item={it} onClick={props.onVpcClick} />
              ));
            })}
          </>
        </VpcContainer>
        <VnetTooltipContainer id={`${NODES_CONSTANTS.REGION.type}${props.region.uiId}`} offsetData={props.offsetsData} offsetX={NODES_CONSTANTS.REGION.expanded.contentPadding} />
      </g>
    </>
  );
};

export default React.memo(RegionExpandNode);
