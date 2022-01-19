import React from 'react';
import { INetworkVNetNode, INetworkVNetworkPeeringConnectionNode } from 'lib/hooks/Topology/models';
import { IPosition } from 'lib/models/general';
import { IRefionContainersOffsets } from '../RegionNode/ExpandNodeContent/helper';
import { IExpandedStyles, NODES_CONSTANTS } from '../../../../model';

interface Props {
  peerConnectionId: string;
  from: INetworkVNetworkPeeringConnectionNode;
  to: INetworkVNetNode;
  fromCenterX: number;
  fromCenterY: number;
  offsetData: IRefionContainersOffsets;
  vnetExpandStyles?: IExpandedStyles;
}

const StructurePeerLink: React.FC<Props> = (props: Props) => {
  const [coordFrom] = React.useState<IPosition>({ x: props.fromCenterX, y: props.fromCenterY });
  const [coordTo, setTocoord] = React.useState<IPosition>(null);

  React.useEffect(() => {
    const { peerConnection_TotalHeight, totalWidth } = props.offsetData;
    const rowWidth = props.to.itemsInRow * (NODES_CONSTANTS.NETWORK_VNET.expanded.minWidth + NODES_CONSTANTS.NETWORK_VNET.expanded.spaceX) - NODES_CONSTANTS.NETWORK_VNET.expanded.spaceX;
    const _offfsetX = props.to.childIndex * (NODES_CONSTANTS.NETWORK_VNET.expanded.minWidth + NODES_CONSTANTS.NETWORK_VNET.expanded.spaceX);
    const _x = _offfsetX + NODES_CONSTANTS.NETWORK_VNET.expanded.minWidth / 2 + totalWidth / 2 - rowWidth / 2;
    const rowY = props.to.rowIndex * (NODES_CONSTANTS.NETWORK_VNET.expanded.minHeight + NODES_CONSTANTS.NETWORK_VNET.expanded.spaceY);
    setTocoord({ x: _x, y: peerConnection_TotalHeight + rowY });
  }, [props.offsetData]);

  return (
    <line
      data-id={props.peerConnectionId}
      className="peerConnectionLink"
      stroke="#BBCDE7"
      x1={coordFrom ? coordFrom.x : null}
      y1={coordFrom ? coordFrom.y : null}
      x2={coordTo ? coordTo.x : null}
      y2={coordTo ? coordTo.y : null}
      strokeDasharray="4, 2"
      data-from={props.from.id}
      data-to={props.to.id}
    />
  );
};

export default React.memo(StructurePeerLink);
