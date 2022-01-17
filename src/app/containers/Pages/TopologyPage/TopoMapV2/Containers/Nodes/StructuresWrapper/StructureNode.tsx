import { closeIcon } from 'app/components/SVGIcons/close';
import { regionIcon } from 'app/components/SVGIcons/topologyIcons/TopoMapV2Icons/VnetPanelIcons/regionIcon';
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
      40,
      NODES_CONSTANTS.REGION.expanded.contentPadding,
      NODES_CONSTANTS.WEB_ACL.structureStyles.nodeStyles,
      NODES_CONSTANTS.PEERING_CONNECTION.structureStyles.nodeStyles,
      NODES_CONSTANTS.NETWORK_VNET.expanded,
      STANDART_DISPLAY_RESOLUTION_V2.width - 80,
      true,
    );
    setOffsetsData(_offsests);
  }, [props.region]);

  const onClose = () => {
    topology.onToogleRegionStructure(props.region);
  };
  const onVpcClick = (item: INetworkVNetNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.VPC, true, item);
  };

  const onWebAclClick = (item: INetworkWebAclNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.WebAcl, true, item);
  };

  if (!offsetsData) return null;

  return (
    <g transform="translate(40, 40)" id={`wrapper${NODES_CONSTANTS.REGION.type}${props.region.uiId}structure`}>
      <rect
        fill={NODES_CONSTANTS.REGION.expanded.bgColor}
        rx={NODES_CONSTANTS.REGION.expanded.borderRadius}
        ry={NODES_CONSTANTS.REGION.expanded.borderRadius}
        width={STANDART_DISPLAY_RESOLUTION_V2.width - 40}
        height={STANDART_DISPLAY_RESOLUTION_V2.height - 40}
      />
      <g transform="translate(0, 0)">
        <foreignObject x="0" y="0" width={STANDART_DISPLAY_RESOLUTION_V2.width - 40} height="40">
          <div style={{ width: '100%', height: '100%', display: 'flex' }}>
            <span
              style={{
                display: 'inline-flex',
                margin: '0 24px 0 0',
                background: NODES_CONSTANTS.REGION.expanded.marker.bgColor,
                borderRadius: `${NODES_CONSTANTS.REGION.expanded.marker.borderRadius}px 0 ${NODES_CONSTANTS.REGION.expanded.marker.borderRadius}px 0`,
                cursor: 'pointer',
                flexShrink: 0,
                width: '40px',
                height: '40px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {regionIcon(24, 24)}
            </span>
            <span
              style={{
                display: 'inline-block',
                maxWidth: 'calc(100% - 80px)',
                margin: 'auto 12px auto 0',
                fontWeight: 500,
                color: NODES_CONSTANTS.REGION.labelExpandedStyles.fill,
                fontSize: '18px',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {props.region.dataItem.name}
            </span>
            <span
              onClick={onClose}
              style={{ display: 'inline-flex', margin: '0 0 0 auto', cursor: 'pointer', flexShrink: 0, width: '40px', height: '40px', alignItems: 'center', justifyContent: 'center' }}
            >
              {closeIcon}
            </span>
          </div>
        </foreignObject>
      </g>
      {props.region.webAcls && props.region.webAcls.length ? (
        <WebAclsContainer offsetY={offsetsData.topOffset} offsetX={NODES_CONSTANTS.REGION.expanded.contentPadding}>
          <>
            {props.region.webAcls.map((row, ri) => {
              return row.map(it => (
                <WebAclNode
                  key={`${it.uiId}webacl`}
                  item={it}
                  x={it.x}
                  // x={it.x * (NODES_CONSTANTS.WEB_ACL.structureStyles.nodeStyles.width + NODES_CONSTANTS.WEB_ACL.structureStyles.nodeStyles.spaceX)}
                  y={it.y}
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
        <PeerContainer
          id={`peerLinkContainerStructure${NODES_CONSTANTS.REGION.type}${props.region.uiId}`}
          offsetY={offsetsData.topOffset + offsetsData.webAcl_TotalHeight}
          offsetX={NODES_CONSTANTS.REGION.expanded.contentPadding}
        >
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

      <VpcContainer
        id={`vnetContainerStructure${props.region.uiId}`}
        offsetY={offsetsData.topOffset + offsetsData.webAcl_TotalHeight + offsetsData.peerConnection_TotalHeight}
        offsetX={NODES_CONSTANTS.REGION.expanded.contentPadding}
      >
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
