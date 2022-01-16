import React from 'react';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';

// import { onHoverNode, onUnHoverNode } from '../../../../Graph/helper';
import { TopologyPanelTypes } from 'lib/models/topology';
import { IDeviceNode, ITopoSitesNode } from 'lib/hooks/Topology/models';
import DeviceNode from '../DeviceNode';
import TransitionContainer from '../../../TransitionContainer';
interface Props {
  site: ITopoSitesNode;
}

const SitesNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const [nodeWidth] = React.useState<number>(props.site.expandedSize.width - NODES_CONSTANTS.SITES.expanded.contentPadding * 2);
  const onDeviceClick = (item: IDeviceNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.Device, true, item);
  };

  return (
    <TransitionContainer id={`wrapper${NODES_CONSTANTS.SITES.type}${props.site.uiId}childrensLayer`} stateIn={props.site.visible && !props.site.collapsed} origin="unset" transform="none" timing={50}>
      <g id={`${NODES_CONSTANTS.SITES.type}${props.site.uiId}childrensLayer`} className="topologyNode" transform={`translate(${props.site.x}, ${props.site.y})`}>
        <g transform={`translate(${NODES_CONSTANTS.SITES.expanded.contentPadding}, ${NODES_CONSTANTS.SITES.headerHeight + NODES_CONSTANTS.SITES.expanded.contentPadding})`}>
          {props.site.children.map((row, ri) => {
            const rowWidth = row.length * (NODES_CONSTANTS.DEVICE.collapse.width + NODES_CONSTANTS.DEVICE.collapse.spaceX) - NODES_CONSTANTS.DEVICE.collapse.spaceX;
            const rowY = ri * (NODES_CONSTANTS.DEVICE.collapse.height + NODES_CONSTANTS.DEVICE.collapse.spaceY);
            return row.map((it, i) => (
              <DeviceNode
                nodeWidth={nodeWidth}
                rowWidth={rowWidth}
                x={i * (NODES_CONSTANTS.DEVICE.collapse.width + NODES_CONSTANTS.DEVICE.collapse.spaceX)}
                y={rowY}
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
