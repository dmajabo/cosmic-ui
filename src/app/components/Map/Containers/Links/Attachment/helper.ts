import { IRotateCoord } from 'lib/models/general';
import { ILink } from 'lib/models/topology';
import * as geometric from 'geometric';

export const getVpsAttachedCoord = (item: ILink): IRotateCoord => {
  const points: number[][] = [
    [0, 0],
    [item.sourceCoord.x - item.targetCoord.x, item.sourceCoord.y - item.targetCoord.y],
  ];
  return calculateAttachmentPosition(points);
};

export const calculateAttachmentPosition = (points: number[][]): IRotateCoord => {
  const midPoint = geometric.lineMidpoint(points);
  const angle = geometric.lineAngle(points);
  const pt = geometric.pointTranslate(midPoint, angle, -42.5);
  return { x: pt[0], y: pt[1], angle: angle };
};
