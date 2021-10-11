import { IRotateCoord } from 'lib/models/general';
import { ILink } from 'lib/models/topology';
import * as geometric from 'geometric';

export const getPointsData = (targetCoord, sourceCoord): number[][] => {
  if (targetCoord.x >= sourceCoord.x) {
    return [
      [sourceCoord.x, sourceCoord.y],
      [targetCoord.x, targetCoord.y],
    ];
  }
  return [
    [targetCoord.x, targetCoord.y],
    [sourceCoord.x, sourceCoord.y],
  ];
};
export const getVpsAttachedCoord = (item: ILink): IRotateCoord => {
  const points: number[][] = getPointsData(item.targetCoord, item.sourceCoord);
  return calculateAttachmentPosition(points);
};

export const calculateAttachmentPosition = (points: number[][]): IRotateCoord => {
  const midPoint = geometric.lineMidpoint(points);
  const angle = geometric.lineAngle(points);
  const pt = geometric.pointTranslate(midPoint, angle, -42.5);
  return { x: pt[0], y: pt[1], angle: angle };
};
