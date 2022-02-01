import React from 'react';
import { ITopoSitesNode } from 'lib/hooks/Topology/models';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
// import { onHoverNode, onUnHoverNode } from '../../../../Graph/helper';
import DeviceNode from '../DeviceNode';
import SitesCollapsedNode from './SitesCollapsedNode';

interface Props {
  dataItem: ITopoSitesNode;
}

const SiteNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();

  if (!props.dataItem.visible) return null;
  if (props.dataItem.collapsed || !topology.entities.sites.selected) {
    return (
      <g id={`${NODES_CONSTANTS.SITES.type}${props.dataItem.uiId}`} className="topologyNode" transform={`translate(${props.dataItem.x}, ${props.dataItem.y})`} data-type={NODES_CONSTANTS.SITES.type}>
        <SitesCollapsedNode site={props.dataItem} dragId={`drag${NODES_CONSTANTS.SITES.type}${props.dataItem.uiId}`} show={props.dataItem.collapsed} />
      </g>
    );
  }
  return (
    <g id={`${NODES_CONSTANTS.SITES.type}${props.dataItem.uiId}childrensLayer`} className="topologyNode" data-type={NODES_CONSTANTS.SITES.type}>
      {props.dataItem.children && props.dataItem.children.length && props.dataItem.children[props.dataItem.currentPage] ? (
        <>
          {props.dataItem.children[props.dataItem.currentPage].map(it => (
            <DeviceNode key={`${it.uiId}device`} item={it} />
          ))}
        </>
      ) : null}
    </g>
  );
};

export default React.memo(SiteNode);
