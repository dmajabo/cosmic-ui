import React from 'react';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';

// import { onHoverNode, onUnHoverNode } from '../../../../Graph/helper';
import { TopologyPanelTypes } from 'lib/models/topology';
import { IDeviceNode, ITopoSitesNode } from 'lib/hooks/Topology/models';
import DeviceNode from '../DeviceNode';
import TransitionContainer from '../../../TransitionContainer';
interface Props {
  dataItem: ITopoSitesNode;
}

const SitesNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const onDeviceClick = (item: IDeviceNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.Device, true, item);
  };

  return (
    <TransitionContainer
      id={`wrapper${NODES_CONSTANTS.SITES.type}${props.dataItem.uiId}childrensLayer`}
      stateIn={props.dataItem.visible && !props.dataItem.collapsed}
      origin="unset"
      transform="none"
      timing={50}
    >
      <g id={`${NODES_CONSTANTS.SITES.type}${props.dataItem.uiId}childrensLayer`} className="topologyNode" transform={`translate(${props.dataItem.x}, ${props.dataItem.y})`}>
        <g transform={`translate(${NODES_CONSTANTS.SITES.expanded.contentPadding}, ${NODES_CONSTANTS.SITES.headerHeight + NODES_CONSTANTS.SITES.expanded.contentPadding})`}>
          {props.dataItem.children.map((row, ri) => {
            return row.map((it, i) => (
              <DeviceNode
                x={i * (NODES_CONSTANTS.DEVICE.collapse.width + NODES_CONSTANTS.DEVICE.collapse.spaceX)}
                y={ri * (NODES_CONSTANTS.DEVICE.collapse.height + NODES_CONSTANTS.DEVICE.collapse.spaceY)}
                key={`${it.uiId}device`}
                item={it}
                onClick={onDeviceClick}
              />
            ));
          })}
        </g>
      </g>
    </TransitionContainer>
  );
};

export default React.memo(SitesNode);
