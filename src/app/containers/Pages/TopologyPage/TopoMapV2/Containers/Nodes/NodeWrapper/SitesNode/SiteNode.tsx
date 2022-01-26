import React from 'react';
import { ITopoSitesNode } from 'lib/hooks/Topology/models';
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

  return (
    <TransitionContainer
      id={`${NODES_CONSTANTS.SITES.type}${props.dataItem.uiId}childrensLayer`}
      className="topologyNode"
      transform="none"
      data-type={NODES_CONSTANTS.SITES.type}
      stateIn={props.dataItem.visible && !props.dataItem.collapsed && topology.entities.sites.selected}
      origin="unset"
    >
      {props.dataItem.children && props.dataItem.children.length && props.dataItem.children[props.dataItem.currentPage] ? (
        <>
          {props.dataItem.children[props.dataItem.currentPage].map(it => (
            <DeviceNode key={`${it.uiId}device`} item={it} />
          ))}
        </>
      ) : null}
    </TransitionContainer>
  );
};

export default React.memo(SiteNode);
