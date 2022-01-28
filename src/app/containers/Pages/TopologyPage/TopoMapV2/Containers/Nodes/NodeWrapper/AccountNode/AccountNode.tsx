import React from 'react';
import { ITopoAccountNode } from 'lib/hooks/Topology/models';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
// import { onHoverNode, onUnHoverNode } from '../../../../Graph/helper';
import NetworkWEdgeNode from '../NetworkWEdgeNode';

interface Props {
  dataItem: ITopoAccountNode;
}

const AccountNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();

  if (!props.dataItem.visible || props.dataItem.collapsed || !topology.entities.transit.selected) return null;
  return (
    <g id={`${NODES_CONSTANTS.ACCOUNT.type}${props.dataItem.uiId}childrensLayer`} className="topologyNode" transform="none" data-type={NODES_CONSTANTS.ACCOUNT.type}>
      {props.dataItem.children && props.dataItem.children.length ? props.dataItem.children.map(it => <NetworkWEdgeNode key={`${it.uiId}wedge`} item={it} />) : null}
    </g>
  );
};

export default React.memo(AccountNode);
