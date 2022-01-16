import React from 'react';
import { ITGWNode, ITopoAccountNode } from 'lib/hooks/Topology/models';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
// import { onHoverNode, onUnHoverNode } from '../../../../Graph/helper';
import { TopologyPanelTypes } from 'lib/models/topology';
import TransitionContainer from '../../../TransitionContainer';
import NetworkWEdgeNode from '../NetworkWEdgeNode';

interface Props {
  dataItem: ITopoAccountNode;
}

const AccountNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();

  const onTgwClick = (item: ITGWNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.Wedge, true, item);
  };
  return (
    <TransitionContainer
      id={`wrapper${NODES_CONSTANTS.ACCOUNT.type}${props.dataItem.uiId}childrensLayer`}
      stateIn={props.dataItem.visible && !props.dataItem.collapsed}
      origin="unset"
      transform="none"
      timing={50}
    >
      <g
        id={`${NODES_CONSTANTS.ACCOUNT.type}${props.dataItem.uiId}childrensLayer`}
        className="topologyNode"
        transform={`translate(${props.dataItem.x}, ${props.dataItem.y})`}
        data-type={NODES_CONSTANTS.ACCOUNT.type}
      >
        <g transform={`translate(${NODES_CONSTANTS.ACCOUNT.expanded.contentPadding}, ${NODES_CONSTANTS.ACCOUNT.headerHeight + NODES_CONSTANTS.ACCOUNT.expanded.contentPadding})`}>
          {props.dataItem.children.map(it => (
            <NetworkWEdgeNode key={`${it.uiId}wedge`} item={it} onClick={onTgwClick} />
          ))}
        </g>
      </g>
    </TransitionContainer>
  );
};

export default React.memo(AccountNode);
