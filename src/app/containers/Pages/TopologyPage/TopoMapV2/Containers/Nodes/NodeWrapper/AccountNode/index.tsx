import React from 'react';
import { ITGWNode, ITopoNode } from 'lib/hooks/Topology/models';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { onHoverNode, onUnHoverNode } from '../../../../Graph/helper';
import { TopologyPanelTypes } from 'lib/models/topology';
import ExpandNodeContent from './ExpandNodeContent';
import TransitionContainer from '../../../TransitionContainer';

interface Props {
  dataItem: ITopoNode<any, ITGWNode>;
}

const AccountNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();

  const onTgwClick = (item: ITGWNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.Wedge, true, item);
  };

  const onMouseEnter = () => {
    onHoverNode(`${NODES_CONSTANTS.ACCOUNT.type}${props.dataItem.uiId}`);
  };

  const onMouseLeave = () => {
    onUnHoverNode(`${NODES_CONSTANTS.ACCOUNT.type}${props.dataItem.uiId}`);
  };
  return (
    <TransitionContainer stateIn={props.dataItem.visible && !props.dataItem.collapsed} origin="unset" transform="none">
      <g
        id={`${NODES_CONSTANTS.ACCOUNT.type}${props.dataItem.uiId}childrens`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="topologyNode"
        transform={`translate(${props.dataItem.x}, ${props.dataItem.y})`}
        data-type={NODES_CONSTANTS.ACCOUNT.type}
      >
        <ExpandNodeContent
          items={props.dataItem.children}
          width={props.dataItem.expandedSize.width}
          height={props.dataItem.expandedSize.height - NODES_CONSTANTS.ACCOUNT.headerHeight}
          onClick={onTgwClick}
        />
      </g>
    </TransitionContainer>
  );
};

export default React.memo(AccountNode);
