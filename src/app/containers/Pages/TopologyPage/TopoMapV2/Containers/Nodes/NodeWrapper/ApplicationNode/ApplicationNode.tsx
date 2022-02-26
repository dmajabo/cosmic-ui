import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { ITopoAppNode } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import React from 'react';
import ApplicationCollapsedNode from './ApplicationCollapsed';

interface Props {
  dataItem: ITopoAppNode;
  onCenteredToNode: (node: any, panelWidth: number) => void;
  onCenteredMap: () => void;
}

const ApplicationNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();

  if (!props.dataItem.visible) return null;
  //   if (props.dataItem.collapsed || !topology.entities.transit.selected) {
  return (
    <g
      id={`application${props.dataItem.uiId}`}
      // onMouseEnter={onMouseEnter}
      // onMouseLeave={onMouseLeave}
      className="topologyNode"
      transform={`translate(${props.dataItem.x}, ${props.dataItem.y})`}
      data-type={'application'}
    >
      <ApplicationCollapsedNode dragId={`drag${NODES_CONSTANTS.ACCOUNT.type}${props.dataItem.uiId}`} application={props.dataItem} show />
    </g>
  );
  //   }
  //   return (
  //     <g id={`${NODES_CONSTANTS.ACCOUNT.type}${props.dataItem.uiId}childrensLayer`} className="topologyNode" data-type={NODES_CONSTANTS.ACCOUNT.type}>
  //       {/* {props.dataItem.children && props.dataItem.children.length */}
  //         {/* ? props.dataItem.children.map(it => <NetworkWEdgeNode key={`${it.uiId}wedge`} item={it} onCenteredToNode={props.onCenteredToNode} onCenteredMap={props.onCenteredMap} />) */}
  //         {/* : null} */}
  //     </g>
  //   );
};

export default React.memo(ApplicationNode);
