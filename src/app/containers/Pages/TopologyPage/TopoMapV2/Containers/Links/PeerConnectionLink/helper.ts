import { ITopoLink, INetworkVNetNode, INetworkVNetworkPeeringConnectionNode } from 'lib/hooks/Topology/models';
import { ICoord } from 'lib/models/general';

export const calculateFromCoord = (link: ITopoLink<INetworkVNetNode, INetworkVNetNode, INetworkVNetworkPeeringConnectionNode>): ICoord => {
  let _x = 0;
  let _y = link.fromParent.y + link.fromParent.height / 2;
  if (link.fromParent.x + link.fromParent.width <= link.toParent.x) {
    _x = link.fromParent.x + link.fromParent.width;
  } else {
    _x = link.fromParent.x;
  }
  return { x: _x, y: _y };
};

export const calculateToCoord = (link: ITopoLink<INetworkVNetNode, INetworkVNetNode, INetworkVNetworkPeeringConnectionNode>): ICoord => {
  let _x = 0;
  let _y = link.toParent.y + link.toParent.height / 2;
  if (link.toParent.x <= link.fromParent.x + link.fromParent.width) {
    _x = link.toParent.x + link.toParent.width;
  } else {
    _x = link.toParent.x;
  }
  return { x: _x, y: _y };
};

export const calculateCoordFromPeerNodeToRegion = (link: ITopoLink<INetworkVNetNode, INetworkVNetNode, INetworkVNetworkPeeringConnectionNode>): ICoord => {
  let region = null;
  if (link.connectionParent.uiId === link.fromParent.uiId) {
    region = link.toParent;
  }
  if (link.connectionParent.uiId === link.toParent.uiId) {
    region = link.fromParent;
  }
  if (!region) return null;
  let _x = 0;
  let _y = region.y + region.height / 2;
  if (link.connection.x < region.x) {
    _x = region.x;
  } else {
    _x = region.x + region.width;
  }
  return { x: _x, y: _y };
};
