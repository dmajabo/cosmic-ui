import React from 'react';
import { ITopoAccountNode } from 'lib/hooks/Topology/models';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
// import { onHoverNode, onUnHoverNode } from '../../../../Graph/helper';
import NetworkWEdgeNode from '../NetworkWEdgeNode';
import AccountCollapsedNode from './AccountCollapsedNode';

interface Props {
  dataItem: ITopoAccountNode;
  onCenteredToNode: (node: any, width: number, height: number) => void;
}

const AccountNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();

  if (!props.dataItem.visible) return null;
  if (props.dataItem.collapsed || !topology.entities.transit.selected) {
    return (
      <g
        id={`${NODES_CONSTANTS.ACCOUNT.type}${props.dataItem.uiId}`}
        // onMouseEnter={onMouseEnter}
        // onMouseLeave={onMouseLeave}
        className="topologyNode"
        transform={`translate(${props.dataItem.x}, ${props.dataItem.y})`}
        data-type={NODES_CONSTANTS.ACCOUNT.type}
      >
        <AccountCollapsedNode dragId={`drag${NODES_CONSTANTS.ACCOUNT.type}${props.dataItem.uiId}`} account={props.dataItem} show />
      </g>
    );
  }
  return (
    <g id={`${NODES_CONSTANTS.ACCOUNT.type}${props.dataItem.uiId}childrensLayer`} className="topologyNode" data-type={NODES_CONSTANTS.ACCOUNT.type}>
      {props.dataItem.children && props.dataItem.children.length
        ? props.dataItem.children.map(it => <NetworkWEdgeNode key={`${it.uiId}wedge`} item={it} onCenteredToNode={props.onCenteredToNode} />)
        : null}
    </g>
  );
};

export default React.memo(AccountNode);
