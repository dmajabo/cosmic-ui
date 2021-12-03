import React from 'react';
import AppsNode from '../Components/MapComponnets/AppsNode';
import SitesNode from '../Components/MapComponnets/SitesNode';
import { EdgeNodeType, ISvgEdgeGroup, ISvgTransitNode, SVG_EDGES_STYLES } from './helpers';
import TransitNode from '../Components/MapComponnets/TransitNode';
interface Props {
  dataItem: ISvgEdgeGroup | ISvgTransitNode;
  type: EdgeNodeType;
  onExpandCollapse?: (node: ISvgEdgeGroup) => void;
}

const EdgeNode: React.FC<Props> = ({ dataItem, type, onExpandCollapse }) => {
  if (type === EdgeNodeType.SITES) {
    return (
      <foreignObject transform={`translate(${dataItem.x}, ${dataItem.y})`} width={SVG_EDGES_STYLES.siteNode.width} height={dataItem.height}>
        <SitesNode data={dataItem as ISvgEdgeGroup} onExpandCollapse={onExpandCollapse} />
      </foreignObject>
    );
  }
  if (type === EdgeNodeType.APPS) {
    return (
      <foreignObject transform={`translate(${dataItem.x}, ${dataItem.y})`} width={SVG_EDGES_STYLES.appNode.width} height={dataItem.height}>
        <AppsNode data={dataItem as ISvgEdgeGroup} onExpandCollapse={onExpandCollapse} />
      </foreignObject>
    );
  }
  if (type === EdgeNodeType.TRANSIT) {
    return (
      <foreignObject transform={`translate(${dataItem.x}, ${dataItem.y})`} width={SVG_EDGES_STYLES.transitNode.width} height={dataItem.height}>
        <TransitNode data={dataItem as ISvgTransitNode} />
      </foreignObject>
    );
  }
  return null;
};

export default React.memo(EdgeNode);
