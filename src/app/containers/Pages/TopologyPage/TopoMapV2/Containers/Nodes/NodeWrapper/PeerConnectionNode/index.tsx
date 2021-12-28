import React from 'react';
import { NODES_CONSTANTS } from '../../../../model';
import { INetworkVNetNode, INetworkVNetworkPeeringConnectionNode, ITopoNode } from 'lib/hooks/Topology/models';
import { buildPeerLinks, IPeerLink } from './helper';
import PeerConnectionLink from './PeerConnectionLink';
interface Props {
  item: INetworkVNetworkPeeringConnectionNode;
  dataItem: ITopoNode<INetworkVNetNode>;
}

const PeerConnectionNode: React.FC<Props> = (props: Props) => {
  const [links, setLinks] = React.useState<IPeerLink[]>([]);
  const [vpsOffsetY, setVpcOffsetY] = React.useState<number>(0);

  React.useEffect(() => {
    const _links = buildPeerLinks(props.item, props.dataItem);
    const _offsetY = props.dataItem.peerConnectionsRows.rows * (NODES_CONSTANTS.PEERING_CONNECTION.collapse.r * 2) + 20;
    setVpcOffsetY(_offsetY);
    setLinks(_links);
  }, []);

  return (
    <>
      {links.map(it => (
        <PeerConnectionLink key={`${it.from.id}${it.to.id}peerLink`} from={it.from} to={it.to} offsetY={vpsOffsetY} />
      ))}
      <g transform={`translate(${props.item.x}, ${props.item.y})`}>
        <circle
          fill={NODES_CONSTANTS.PEERING_CONNECTION.collapse.bgColor}
          r={NODES_CONSTANTS.PEERING_CONNECTION.collapse.r}
          cx={NODES_CONSTANTS.PEERING_CONNECTION.collapse.r}
          cy={NODES_CONSTANTS.PEERING_CONNECTION.collapse.r}
        />
        <use
          href={`#${NODES_CONSTANTS.PEERING_CONNECTION.type}`}
          width={NODES_CONSTANTS.PEERING_CONNECTION.collapse.iconWidth}
          height={NODES_CONSTANTS.PEERING_CONNECTION.collapse.iconHeight}
          x={NODES_CONSTANTS.PEERING_CONNECTION.collapse.iconOffsetX}
          y={NODES_CONSTANTS.PEERING_CONNECTION.collapse.iconOffsetY}
        />
      </g>
    </>
  );
};

export default React.memo(PeerConnectionNode);
