import React from 'react';
import { NODES_CONSTANTS } from '../../../../model';
import { INetworkVNetNode } from 'lib/hooks/Topology/models';

interface Props {
  item: INetworkVNetNode;
}

const NetworkVnetNode: React.FC<Props> = (props: Props) => {
  return (
    <g transform={`translate(${props.item.x}, ${props.item.y})`} id={`vpsCollapsed${props.item.id}`}>
      <circle
        r={NODES_CONSTANTS.NETWORK_VNET.collapse.r - 1}
        cx={NODES_CONSTANTS.NETWORK_VNET.collapse.r}
        cy={NODES_CONSTANTS.NETWORK_VNET.collapse.r}
        fill="var(--_primaryBg)"
        stroke="var(--_primaryBg)"
        strokeWidth="1"
        className="vpcCollapsedBg"
      />
      <use
        className="vpsBgIcon"
        href={`#${NODES_CONSTANTS.NETWORK_VNET.type}`}
        width={NODES_CONSTANTS.NETWORK_VNET.collapse.iconWidth}
        height={NODES_CONSTANTS.NETWORK_VNET.collapse.iconHeight}
        x={0}
        y={0}
      />
      <foreignObject
        width={NODES_CONSTANTS.NETWORK_VNET.labelHtmlStyles.width}
        height={NODES_CONSTANTS.NETWORK_VNET.labelHtmlStyles.height}
        x={NODES_CONSTANTS.NETWORK_VNET.labelHtmlStyles.x}
        y={NODES_CONSTANTS.NETWORK_VNET.labelHtmlStyles.y}
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
              color: NODES_CONSTANTS.NETWORK_VNET.labelHtmlStyles.fill,
              fontSize: NODES_CONSTANTS.NETWORK_VNET.labelHtmlStyles.fontSize + 'px',
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

export default React.memo(NetworkVnetNode);
