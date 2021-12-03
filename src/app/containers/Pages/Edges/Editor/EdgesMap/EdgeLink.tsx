import React from 'react';
import { IEdgeLink, SVG_EDGES_STYLES } from './helpers';

interface Props {
  dataItem: IEdgeLink;
}

const EdgeLink: React.FC<Props> = ({ dataItem }) => {
  if (!dataItem.transit || !dataItem.transit.length) {
    return (
      <g>
        <line
          strokeWidth={SVG_EDGES_STYLES.link.strokeWidth}
          stroke={SVG_EDGES_STYLES.link.color}
          x1={dataItem.source.x + dataItem.source.offsetX + SVG_EDGES_STYLES.siteNode.width}
          y1={dataItem.source.y + dataItem.source.height / 2}
          x2={dataItem.destination.x + dataItem.destination.offsetX}
          y2={dataItem.destination.y + dataItem.destination.height / 2}
        />
      </g>
    );
  }
  return (
    <g>
      {dataItem.transit.map(it => {
        if (dataItem.source && dataItem.destination) {
          return (
            <>
              <line
                strokeWidth={SVG_EDGES_STYLES.link.strokeWidth}
                stroke={SVG_EDGES_STYLES.link.color}
                x1={dataItem.source.x + dataItem.source.offsetX + SVG_EDGES_STYLES.siteNode.width}
                y1={dataItem.source.y + dataItem.source.height / 2}
                x2={it.x + it.offsetX}
                y2={it.y + it.height / 2}
              />
              <line
                strokeWidth={SVG_EDGES_STYLES.link.strokeWidth}
                stroke={SVG_EDGES_STYLES.link.color}
                x1={dataItem.destination.x + dataItem.destination.offsetX}
                y1={dataItem.destination.y + dataItem.destination.height / 2}
                x2={it.x + it.offsetX + SVG_EDGES_STYLES.transitNode.width}
                y2={it.y + it.height / 2}
              />
            </>
          );
        }
        if (dataItem.source && !dataItem.destination) {
          return (
            <>
              <line
                strokeWidth={SVG_EDGES_STYLES.link.strokeWidth}
                stroke={SVG_EDGES_STYLES.link.color}
                x1={dataItem.source.x + dataItem.source.offsetX}
                y1={dataItem.source.y + dataItem.source.height / 2}
                x2={it.x + it.offsetX}
                y2={it.y + it.height / 2}
              />
            </>
          );
        }
        if (!dataItem.source && dataItem.destination) {
          return (
            <>
              <line
                strokeWidth={SVG_EDGES_STYLES.link.strokeWidth}
                stroke={SVG_EDGES_STYLES.link.color}
                x1={dataItem.destination.x + dataItem.destination.offsetX}
                y1={dataItem.destination.y + dataItem.destination.height / 2}
                x2={it.x + it.offsetX + SVG_EDGES_STYLES.transitNode.width}
                y2={it.y + it.height / 2}
              />
            </>
          );
        }
        return null;
      })}
    </g>
  );
};

export default React.memo(EdgeLink);
