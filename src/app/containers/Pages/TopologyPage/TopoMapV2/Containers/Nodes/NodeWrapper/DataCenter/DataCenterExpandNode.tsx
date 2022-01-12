import React from 'react';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import NodeMarker from '../../Containers/NodeMarker';
import NodeExpandedName from '../../Containers/NodeName/NodeExpandedName';

interface Props {
  id: string;
  name: string;
  show: boolean;
}

const DataCenterExpandNode: React.FC<Props> = (props: Props) => {
  return (
    <TransitionContainer id={`expandNodeWrapper${props.id}`} stateIn={props.show} origin="unset" transform="none" timing={50}>
      <g transform={`translate(${NODES_CONSTANTS.DATA_CENTER.expanded.minOffsetX}, ${NODES_CONSTANTS.DATA_CENTER.expanded.minOffsetY})`}>
        <g style={{ cursor: 'pointer' }} pointerEvents="all">
          <rect
            fill={NODES_CONSTANTS.DATA_CENTER.expanded.bgColor}
            width={NODES_CONSTANTS.DATA_CENTER.expanded.minWidth}
            height={NODES_CONSTANTS.DATA_CENTER.expanded.minHeight}
            rx={NODES_CONSTANTS.DATA_CENTER.expanded.borderRadius}
            ry={NODES_CONSTANTS.DATA_CENTER.expanded.borderRadius}
            pointerEvents="all"
          />
          <g transform="translate(0, 0)">
            <NodeMarker iconId={NODES_CONSTANTS.DATA_CENTER.iconId} stylesObj={NODES_CONSTANTS.DATA_CENTER.expanded.marker} />
            <NodeExpandedName
              name={props.name}
              strBtnLabel="Open Region"
              nodeWidth={NODES_CONSTANTS.DATA_CENTER.expanded.minWidth}
              markerWidth={NODES_CONSTANTS.DATA_CENTER.expanded.marker.width}
              height={NODES_CONSTANTS.DATA_CENTER.expanded.marker.height}
              stylesObj={NODES_CONSTANTS.DATA_CENTER.labelExpandedStyles}
            />
          </g>
        </g>
      </g>
    </TransitionContainer>
  );
};

export default React.memo(DataCenterExpandNode);
