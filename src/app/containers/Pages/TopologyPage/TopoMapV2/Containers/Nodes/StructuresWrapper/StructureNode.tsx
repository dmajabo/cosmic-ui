import { closeIcon } from 'app/components/SVGIcons/close';
import { regionIcon } from 'app/components/SVGIcons/topologyIcons/TopoMapV2Icons/VnetPanelIcons/regionIcon';
import { INetworkVNetNode, INetworkWebAclNode, ITopoRegionNode } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { STANDART_DISPLAY_RESOLUTION_V2 } from 'lib/models/general';
import { TopologyPanelTypes } from 'lib/models/topology';
import React from 'react';
import { NODES_CONSTANTS } from '../../../model';
import NetworkVnetNode from '../NodeWrapper/NetworkVnetNode';
import PeerConnectionNode from '../NodeWrapper/PeerConnectionNode';
import PeerContainer from '../NodeWrapper/RegionNode/ExpandNodeContent/PeerContainer';
import VpcContainer from '../NodeWrapper/RegionNode/ExpandNodeContent/VpcContainer';
import WebAclsContainer from '../NodeWrapper/RegionNode/ExpandNodeContent/WebAclsContainer';
import WebAclNode from '../NodeWrapper/WebAclNode';
import { getContainerHeight } from './helper';

interface Props {
  dataItem: ITopoRegionNode;
}

const StructureNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const [webAclsHeight, setWebAclsHeight] = React.useState<number>(0);
  const [peerConnectionHeight, setPeerConnectionHeight] = React.useState<number>(0);
  // const [vpcHeight, setVpcHeight] = React.useState<number>(0);
  // const [totalHeight, setTotalHeight] = React.useState<number>(0);

  React.useEffect(() => {
    const _wH = getContainerHeight(
      props.dataItem.webAclsRows.rows,
      topology.entities.web_acls.selected,
      NODES_CONSTANTS.REGION.expanded.contentPadding,
      NODES_CONSTANTS.WEB_ACL.structureStyles.nodeStyles,
    );
    const _pH = getContainerHeight(
      props.dataItem.peerConnectionsRows.rows,
      topology.entities.peer_connections.selected,
      NODES_CONSTANTS.REGION.expanded.contentPadding,
      NODES_CONSTANTS.WEB_ACL.structureStyles.nodeStyles,
    );
    // const _cH = getContainerHeight(
    //   props.dataItem.childrenRows.rows,
    //   topology.entities.web_acls.selected,
    //   NODES_CONSTANTS.REGION.expanded.contentPadding,
    //   NODES_CONSTANTS.WEB_ACL.structureStyles.nodeStyles,
    // );
    setWebAclsHeight(_wH);
    setPeerConnectionHeight(_pH);
    // setVpcHeight(_cH);
    // setTotalHeight(_wH + _pH + _cH);
  }, [props.dataItem, topology.entities]);

  const onClose = () => {
    topology.onToogleRegionStructure(props.dataItem);
  };
  const onVpcClick = (item: INetworkVNetNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.VPC, true, item);
  };

  const onWebAclClick = (item: INetworkWebAclNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.WebAcl, true, item);
  };
  return (
    <g transform="translate(40, 40)" id={`wrapper${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}structure`}>
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
              {props.dataItem.name}
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
      {topology.entities && topology.entities.web_acls.selected && props.dataItem.webAcls && props.dataItem.webAcls.length ? (
        <WebAclsContainer offsetY={NODES_CONSTANTS.REGION.headerHeight} offsetX={NODES_CONSTANTS.REGION.expanded.contentPadding}>
          <>
            {props.dataItem.webAcls.map((it, index) => (
              <WebAclNode
                key={`${it.uiId}webacl`}
                item={it}
                x={index * 100}
                y={0}
                onClick={onWebAclClick}
                nodeStyles={NODES_CONSTANTS.WEB_ACL.structureStyles.nodeStyles}
                counterStyles={NODES_CONSTANTS.WEB_ACL.structureStyles.countStyles}
                labelStyles={NODES_CONSTANTS.WEB_ACL.structureStyles.labelHtmlStyles}
              />
            ))}
          </>
        </WebAclsContainer>
      ) : null}
      {topology.entities && topology.entities.peer_connections.selected && props.dataItem.peerConnections && props.dataItem.peerConnections.length ? (
        <PeerContainer showWebAcls={topology.entities && topology.entities.web_acls.selected} webAclTotalHeight={webAclsHeight} offsetX={NODES_CONSTANTS.REGION.expanded.contentPadding}>
          <>
            {props.dataItem.peerConnections.map((it, index) => (
              <PeerConnectionNode
                key={`${it.uiId}peerConnection`}
                parentId={`wrapper${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}structure`}
                item={it}
                x={index * 100}
                y={0}
                dataItem={props.dataItem}
                showLabel
                labelStyles={NODES_CONSTANTS.PEERING_CONNECTION.structureStyles.labelHtmlStyles}
                nodeStyles={NODES_CONSTANTS.PEERING_CONNECTION.structureStyles.nodeStyles}
              />
            ))}
          </>
        </PeerContainer>
      ) : null}

      <VpcContainer
        showWebAcls={topology.entities && topology.entities.web_acls.selected}
        webAclTotalHeight={webAclsHeight}
        showPeerConnections={topology.entities && topology.entities.peer_connections.selected}
        peerConnectionTotalHeight={peerConnectionHeight}
        offsetX={NODES_CONSTANTS.REGION.expanded.contentPadding}
      >
        <>
          {props.dataItem.children.map(it => (
            <NetworkVnetNode key={`${it.uiId}vnet`} parentId={`${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}`} region={props.dataItem} item={it} onClick={onVpcClick} />
          ))}
        </>
      </VpcContainer>
    </g>
  );
};

export default React.memo(StructureNode);
