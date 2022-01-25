import React from 'react';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import NodeMarker from '../../Containers/NodeMarker';
import NodeExpandedName from '../../Containers/NodeName/NodeExpandedName';
import { ITopoSitesNode } from 'lib/hooks/Topology/models';
import SitePager from './SitePager';
// import VPNLink from '../../../Links/VPNLink';

interface Props {
  x: number;
  y: number;
  dragId: string;
  site: ITopoSitesNode;
  show: boolean;
  showTransits: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const SitesExpandNode: React.FC<Props> = (props: Props) => {
  return (
    <TransitionContainer id={`expandNodeWrapper${props.site.dataItem.id}`} stateIn={props.show} origin="unset" transform="none">
      <g style={{ cursor: 'pointer' }}>
        <rect
          id={props.dragId}
          fill={NODES_CONSTANTS.SITES.expanded.bgColor}
          width={props.site.expandedSize.width}
          height={props.site.expandedSize.height}
          rx={NODES_CONSTANTS.SITES.expanded.borderRadius}
          ry={NODES_CONSTANTS.SITES.expanded.borderRadius}
          pointerEvents="all"
        />
        <g transform="translate(0, 0)">
          <NodeMarker iconId={NODES_CONSTANTS.SITES.iconId} fill={props.site.dataItem.color} stylesObj={NODES_CONSTANTS.SITES.expanded.marker} />
          <NodeExpandedName
            name={props.site.dataItem.name}
            nodeWidth={props.site.expandedSize.width}
            markerWidth={NODES_CONSTANTS.SITES.expanded.marker.width}
            height={NODES_CONSTANTS.SITES.expanded.marker.height}
            stylesObj={NODES_CONSTANTS.SITES.labelExpandedStyles}
          />
        </g>
        {props.site.children.length > 1 ? (
          <SitePager
            y={props.site.expandedSize.height - 20}
            width={props.site.expandedSize.width}
            currentPage={props.site.currentPage}
            totalPages={props.site.children.length}
            onPrev={props.onPrev}
            onNext={props.onNext}
          />
        ) : null}
      </g>
      {/* {props.site.links && props.site.links.length ? (
        <TransitionContainer id={`linksWrapper${NODES_CONSTANTS.SITES.type}${props.site.uiId}`} stateIn={props.showTransits} transform="none">
          <>
            {props.site.links.map(it => {
              if (it.fromNode.child.page !== props.currentPage) return null;
              return <VPNLink key={`link${NODES_CONSTANTS.SITES.type}${props.site.uiId}${it.id}`} dataItem={it} />;
            })}
          </>
        </TransitionContainer>
      ) : null} */}
    </TransitionContainer>
  );
};

export default React.memo(SitesExpandNode);
