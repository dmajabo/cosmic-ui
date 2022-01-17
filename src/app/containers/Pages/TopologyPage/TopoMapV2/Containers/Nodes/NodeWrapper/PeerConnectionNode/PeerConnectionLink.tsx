import React from 'react';
import { INetworkVNetNode, INetworkVNetworkPeeringConnectionNode } from 'lib/hooks/Topology/models';
import { IPosition } from 'lib/models/general';
import { IRefionContainersOffsets } from '../RegionNode/ExpandNodeContent/helper';
import { ICollapseStyles, IExpandedStyles } from '../../../../model';
import { getVnetXPosition, getVnetYPosition } from './helper';

interface Props {
  peerConnectionId: string;
  from: INetworkVNetworkPeeringConnectionNode;
  to: INetworkVNetNode;
  fromCenterX: number;
  fromCenterY: number;
  offsetData: IRefionContainersOffsets;
  vnetCollapseStyles?: ICollapseStyles;
  vnetExpandStyles?: IExpandedStyles;
  isStructure?: boolean;
}

const PeerConnectionLink: React.FC<Props> = (props: Props) => {
  const [coordFrom] = React.useState<IPosition>({ x: props.fromCenterX, y: props.fromCenterY });
  const [coordTo, setTocoord] = React.useState<IPosition>(null);

  React.useEffect(() => {
    const { peerConnection_TotalHeight } = props.offsetData;
    if (props.isStructure) {
      // const _x = getVnetXPosition(props.offsetData.totalWidth, props.vnetExpandStyles.minWidth, props.vnetExpandStyles.spaceX, props.from.childIndex, props.from.itemsInRow);
      // const _y = getVnetYPosition(peerConnection_TotalHeight, props.vnetExpandStyles.minHeight, props.vnetExpandStyles.spaceY, props.from.rowIndex, 0);
      // setTocoord({ x: _x, y: _y });
    } else {
      const _x = getVnetXPosition(props.to.x, props.vnetCollapseStyles.width);
      const _y = getVnetYPosition(props.to.y, peerConnection_TotalHeight, props.vnetCollapseStyles.height);
      setTocoord({ x: _x, y: _y });
    }
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

export default React.memo(PeerConnectionLink);
