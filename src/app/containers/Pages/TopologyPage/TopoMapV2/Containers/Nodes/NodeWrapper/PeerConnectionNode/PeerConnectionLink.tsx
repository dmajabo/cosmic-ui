import React from 'react';
import { INetworkVNetNode, INetworkVNetworkPeeringConnectionNode } from 'lib/hooks/Topology/models';
import { IPosition } from 'lib/models/general';
import { IRefionContainersOffsets } from '../RegionNode/ExpandNodeContent/helper';
import { ICollapseStyles, IExpandedStyles } from '../../../../model';
import { getVnetXPosition, getVnetYPosition } from './helper';

interface Props {
  peerConnectionId: string;
  from: INetworkVNetNode;
  to: INetworkVNetworkPeeringConnectionNode;
  toCenterX: number;
  toCenterY: number;
  offsetData: IRefionContainersOffsets;
  vnetCollapseStyles?: ICollapseStyles;
  vnetExpandStyles?: IExpandedStyles;
  isStructure?: boolean;
}

const PeerConnectionLink: React.FC<Props> = (props: Props) => {
  const [coordFrom, setCoordFrom] = React.useState<IPosition>(null);
  const [coordTo] = React.useState<IPosition>({ x: props.toCenterX, y: props.toCenterY });

  React.useEffect(() => {
    const { peerConnection_TotalHeight } = props.offsetData;
    if (props.isStructure) {
      const _x = getVnetXPosition(props.offsetData.totalWidth, props.vnetExpandStyles.minWidth, props.vnetExpandStyles.spaceX, props.from.childIndex, props.from.itemsInRow);
      const _y = getVnetYPosition(peerConnection_TotalHeight, props.vnetExpandStyles.minHeight, props.vnetExpandStyles.spaceY, props.from.rowIndex, 0);
      setCoordFrom({ x: _x, y: _y });
    } else {
      const _x = getVnetXPosition(props.offsetData.totalWidth, props.vnetCollapseStyles.width, props.vnetCollapseStyles.spaceX, props.from.childIndex, props.from.itemsInRow);
      const _y = getVnetYPosition(peerConnection_TotalHeight, props.vnetCollapseStyles.height, props.vnetCollapseStyles.spaceY, props.from.rowIndex, props.vnetCollapseStyles.r);
      setCoordFrom({ x: _x, y: _y });
    }
  }, [props.offsetData]);

  return (
    <line
      data-id={props.peerConnectionId}
      className="peerConnectionLink"
      stroke="#BBCDE7"
      x1={coordFrom ? coordFrom.x : null}
      y1={coordFrom ? coordFrom.y : null}
      x2={coordTo.x}
      y2={coordTo.y}
      strokeDasharray="4, 2"
      data-from={props.from.id}
      data-to={props.to.id}
    />
  );
};

export default React.memo(PeerConnectionLink);
