import { SegmentTargetT } from 'lib/api/ApiModels/Edges/apiModel';
import React from 'react';
import { IEdgeLink, SVG_EDGES_STYLES } from './helpers';
import SvgLinkComponent from './SvgLinkComponent';

interface Props {
  dataItem: IEdgeLink;
}

const EdgeLink: React.FC<Props> = ({ dataItem }) => {
  if (!dataItem.transit || !dataItem.transit.length) {
    if (!dataItem.source || !dataItem.destination) return null;
    return (
      <g>
        <SvgLinkComponent
          x1={dataItem.sourceType === SegmentTargetT.SITE_GROUP ? dataItem.source.x + dataItem.source.offsetX + SVG_EDGES_STYLES.siteNode.width : dataItem.source.x + dataItem.source.offsetX}
          y1={dataItem.source.y + dataItem.source.height / 2}
          x2={
            dataItem.sourceType === SegmentTargetT.SITE_GROUP
              ? dataItem.destination.x + dataItem.destination.offsetX
              : dataItem.destination.x + dataItem.destination.offsetX + SVG_EDGES_STYLES.siteNode.width
          }
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
              <SvgLinkComponent
                key={`${it.id}linkSource`}
                x1={dataItem.sourceType === SegmentTargetT.SITE_GROUP ? dataItem.source.x + dataItem.source.offsetX + SVG_EDGES_STYLES.siteNode.width : dataItem.source.x + dataItem.source.offsetX}
                y1={dataItem.source.y + dataItem.source.height / 2}
                x2={it.x + it.offsetX}
                y2={it.y + it.height / 2}
              />
              <SvgLinkComponent
                key={`${it.id}linkDestination`}
                x1={
                  dataItem.sourceType === SegmentTargetT.SITE_GROUP
                    ? dataItem.destination.x + dataItem.destination.offsetX
                    : dataItem.destination.x + dataItem.destination.offsetX + SVG_EDGES_STYLES.siteNode.width
                }
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
              <SvgLinkComponent
                key={`${it.id}linkSource`}
                x1={dataItem.sourceType === SegmentTargetT.SITE_GROUP ? dataItem.source.x + dataItem.source.offsetX + SVG_EDGES_STYLES.siteNode.width : dataItem.source.x + dataItem.source.offsetX}
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
              <SvgLinkComponent
                key={`${it.id}linkDestination`}
                x1={
                  dataItem.sourceType === SegmentTargetT.SITE_GROUP
                    ? dataItem.destination.x + dataItem.destination.offsetX
                    : dataItem.destination.x + dataItem.destination.offsetX + SVG_EDGES_STYLES.siteNode.width
                }
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
