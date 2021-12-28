import React from 'react';
import { NODES_CONSTANTS } from '../../../../model';
import { INetworkVNetNode, INetworkVNetworkPeeringConnectionNode } from 'lib/hooks/Topology/models';
interface Props {
  from: INetworkVNetNode;
  to: INetworkVNetworkPeeringConnectionNode;
  offsetY: number;
}

const PeerConnectionLink: React.FC<Props> = ({ from, to, offsetY }) => {
  return (
    <line
      stroke="#BBCDE7"
      x1={from.x + NODES_CONSTANTS.NETWORK_VNET.collapse.r}
      y1={offsetY + from.y + NODES_CONSTANTS.NETWORK_VNET.collapse.r}
      x2={to.x + NODES_CONSTANTS.PEERING_CONNECTION.collapse.r}
      y2={to.y + NODES_CONSTANTS.PEERING_CONNECTION.collapse.r}
      strokeDasharray="4, 2"
    />
  );
};

export default React.memo(PeerConnectionLink);
