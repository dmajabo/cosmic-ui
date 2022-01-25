import React from 'react';
import { IDeviceNode, ITopoSitesNode, TopologyPanelTypes } from 'lib/hooks/Topology/models';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
// import { onHoverNode, onUnHoverNode } from '../../../../Graph/helper';
import TransitionContainer from '../../../TransitionContainer';
import DeviceNode from '../DeviceNode';

interface Props {
  dataItem: ITopoSitesNode;
}

const SiteNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();

  const onDeviceClick = (item: IDeviceNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.Device, true, item);
  };
  return (
    <TransitionContainer
      id={`${NODES_CONSTANTS.SITES.type}${props.dataItem.uiId}childrensLayer`}
      className="topologyNode"
      transform="none"
      data-type={NODES_CONSTANTS.SITES.type}
      stateIn={props.dataItem.visible && !props.dataItem.collapsed}
      origin="unset"
      timing={50}
    >
      {topology.entities &&
      topology.entities.sites &&
      topology.entities.sites.selected &&
      props.dataItem.children &&
      props.dataItem.children.length &&
      props.dataItem.children[props.dataItem.currentPage] ? (
        <>
          {props.dataItem.children[props.dataItem.currentPage].map(it => (
            <DeviceNode x={it.x} y={it.y} key={`${it.uiId}device`} item={it} onClick={onDeviceClick} />
          ))}
        </>
      ) : null}
    </TransitionContainer>
  );
};

export default React.memo(SiteNode);
