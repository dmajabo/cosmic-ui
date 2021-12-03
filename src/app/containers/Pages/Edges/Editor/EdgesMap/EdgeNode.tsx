import React from 'react';
import AppsNode from '../Components/MapComponnets/AppsNode';
import SitesNode from '../Components/MapComponnets/SitesNode';
import { EdgeNodeType, ISvgEdgeGroup, ISvgTransitNode } from './helpers';
import TransitNode from '../Components/MapComponnets/TransitNode';
interface Props {
  dataItem: ISvgEdgeGroup | ISvgTransitNode;
  type: EdgeNodeType;
}

const EdgeNode: React.FC<Props> = ({ dataItem, type }) => {
  if (type === EdgeNodeType.SITES) {
    return (
      <foreignObject transform={`translate(${dataItem.x}, ${dataItem.y})`} width="calc(300px - 96px)" height={dataItem.height}>
        <SitesNode data={dataItem as ISvgEdgeGroup} />
      </foreignObject>
    );
  }
  if (type === EdgeNodeType.APPS) {
    return (
      <foreignObject transform={`translate(${dataItem.x}, ${dataItem.y})`} width="calc(300px - 96px)" height={dataItem.height}>
        <AppsNode data={dataItem as ISvgEdgeGroup} />
      </foreignObject>
    );
  }
  if (type === EdgeNodeType.TRANSIT) {
    return (
      <foreignObject transform={`translate(${dataItem.x}, ${dataItem.y})`} width="calc(300px - 176px)" height={dataItem.height}>
        <TransitNode data={dataItem as ISvgTransitNode} />
      </foreignObject>
    );
  }
  return null;
};

export default React.memo(EdgeNode);
