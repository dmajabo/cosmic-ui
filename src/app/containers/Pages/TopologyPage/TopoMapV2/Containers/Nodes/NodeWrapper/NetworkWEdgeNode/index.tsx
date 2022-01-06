import React from 'react';
import { NODES_CONSTANTS } from '../../../../model';
import { ITGWNode } from 'lib/hooks/Topology/models';
import { setSelectedClass } from '../helper';

interface Props {
  item: ITGWNode;
  onClick: (item: ITGWNode) => void;
}

const NetworkWEdgeNode: React.FC<Props> = (props: Props) => {
  const onClick = () => {
    setSelectedClass(props.item.nodeType, `wedgeCollapsed${props.item.id}`, props.item.id);
    props.onClick(props.item);
  };
  return (
    <g transform={`translate(${props.item.x}, ${props.item.y})`} id={`wedgeCollapsed${props.item.id}`} onClick={onClick} className="topoNodeLevel1 wedgeNodeWrapper">
      <use
        pointerEvents="all"
        href={`#${NODES_CONSTANTS.NETWORK_WEDGE.type}`}
        width={NODES_CONSTANTS.NETWORK_WEDGE.collapse.width}
        height={NODES_CONSTANTS.NETWORK_WEDGE.collapse.height}
        x={0}
        y={0}
      />
      <foreignObject
        width={NODES_CONSTANTS.NETWORK_WEDGE.labelHtmlStyles.width}
        height={NODES_CONSTANTS.NETWORK_WEDGE.labelHtmlStyles.height}
        x={NODES_CONSTANTS.NETWORK_WEDGE.labelHtmlStyles.x}
        y={NODES_CONSTANTS.NETWORK_WEDGE.labelHtmlStyles.y}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
          }}
          title={props.item.name}
        >
          <span
            style={{
              display: 'inline-block',
              maxWidth: '100%',
              margin: 'auto',
              color: NODES_CONSTANTS.NETWORK_WEDGE.labelHtmlStyles.fill,
              fontSize: NODES_CONSTANTS.NETWORK_WEDGE.labelHtmlStyles.fontSize + 'px',
              textAlign: 'center',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              fontWeight: 500,
            }}
          >
            {props.item.name}
          </span>
        </div>
      </foreignObject>
    </g>
  );
};

export default React.memo(NetworkWEdgeNode);
