import React from 'react';
import { NODES_CONSTANTS } from '../../../../model';
import { INetworkVNetNode, ITopoRegionNode } from 'lib/hooks/Topology/models';
import NodeCounter from '../../Containers/NodeCounter';
import { select } from 'd3-selection';
import { buildVnetTooltip, removeVnetTooltip } from './tooltipHelper';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';

interface Props {
  parentId: string;
  region: ITopoRegionNode;
  item: INetworkVNetNode;
  onClick: (item: INetworkVNetNode) => void;
}

const NetworkVnetNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const [isNodeSelected, setIsNodeSelected] = React.useState<boolean>(false);
  const nodeRef = React.useRef(null);

  React.useEffect(() => {
    if (topology.selectedNode && topology.selectedNode.uiId === props.item.uiId && !isNodeSelected) {
      setIsNodeSelected(true);
    } else if (!topology.selectedNode || (topology.selectedNode && topology.selectedNode !== props.item.uiId)) {
      setIsNodeSelected(false);
    }
  }, [topology.selectedNode]);

  const onClick = () => {
    props.onClick(props.item);
  };
  const onMouseEnter = (e: React.BaseSyntheticEvent<MouseEvent>) => {
    const _node = select(nodeRef.current);
    _node.raise();
    buildVnetTooltip(e, props.region, props.item, props.parentId);
  };
  const onMouseLeave = () => {
    removeVnetTooltip(props.parentId);
  };
  return (
    <g
      ref={nodeRef}
      onMouseOver={onMouseEnter}
      onMouseOut={onMouseLeave}
      id={`${props.item.nodeType}${props.item.id}`}
      className={`topoNodeLevel1 vnetNodeWrapper ${isNodeSelected ? 'selectedTopoLevel1' : ''}`}
      transform={`translate(${props.item.x}, ${props.item.y})`}
      data-id={`vnet${props.item.id}`}
      onClick={onClick}
      cursor="pointer"
    >
      <circle
        r={NODES_CONSTANTS.NETWORK_VNET.collapse.r - 1}
        cx={NODES_CONSTANTS.NETWORK_VNET.collapse.r}
        cy={NODES_CONSTANTS.NETWORK_VNET.collapse.r}
        fill="var(--_primaryBg)"
        stroke="var(--_primaryBg)"
        strokeWidth="1"
        className="vpcCollapsedBg"
        pointerEvents="all"
      />
      <svg
        width={NODES_CONSTANTS.NETWORK_VNET.collapse.iconWidth}
        height={NODES_CONSTANTS.NETWORK_VNET.collapse.iconHeight}
        x={NODES_CONSTANTS.NETWORK_VNET.collapse.iconOffsetX}
        y={NODES_CONSTANTS.NETWORK_VNET.collapse.iconOffsetY}
        viewBox="0 0 19 18"
        color="#7BAB4E"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        pointerEvents="none"
        className="vpsBgIcon"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.6243 9.60039L14.7583 8.85596V15.607C15.3032 15.5528 15.7425 15.3742 16.0546 15.0581C16.6314 14.4734 16.6246 13.6163 16.6243 13.6078V9.60039ZM14.0798 15.6114V8.85596L12.2139 9.60039V13.601C12.2162 13.6711 12.2933 15.4137 14.0798 15.6114ZM17.3022 13.6009C17.3032 13.6392 17.3202 14.7335 16.5439 15.5263C16.0364 16.045 15.3209 16.308 14.4184 16.308C12.1884 16.308 11.5567 14.5423 11.5347 13.609V9.37118C11.5347 9.23278 11.6191 9.10826 11.7481 9.05682L14.2926 8.04169C14.3733 8.00954 14.4636 8.00954 14.5443 8.04169L17.0888 9.05682C17.2177 9.10826 17.3022 9.23278 17.3022 9.37118V13.6009ZM18.3209 12.936L18.3205 8.41622L14.419 6.85968L10.5174 8.41622V12.9244C10.5168 12.9552 10.4716 15.0319 11.7164 16.3096C12.3719 16.9823 13.2811 17.3234 14.419 17.3234C15.5647 17.3234 16.4783 16.9799 17.1345 16.3028C18.3775 15.0197 18.3216 12.9566 18.3209 12.936ZM17.6218 16.7728C16.833 17.5873 15.7551 18.0001 14.4184 18.0001C13.0882 18.0001 12.0141 17.5886 11.2259 16.7772C9.78101 15.2907 9.83529 13.01 9.83834 12.9139V8.1871C9.83834 8.0487 9.92282 7.92418 10.0517 7.87274L14.2926 6.18085C14.3733 6.1487 14.4636 6.1487 14.5443 6.18085L18.7851 7.87274C18.914 7.92418 18.9985 8.0487 18.9985 8.1871V12.9244C19.0016 13.009 19.0626 15.2856 17.6218 16.7728ZM3.75059 11.5708H8.82092V12.2475H3.75059C1.68853 12.2475 0.114333 10.8764 0.00814238 8.98725C0.000678532 8.9101 0 8.82009 0 8.73008C0 6.40575 1.62949 5.54999 2.57978 5.24884C2.57299 5.14022 2.5696 5.03024 2.5696 4.91959C2.5696 3.07441 3.88935 1.14396 5.63894 0.429302C7.69354 -0.409878 9.85975 -0.00348439 11.4316 1.51448C11.9612 2.02916 12.3649 2.57869 12.657 3.18405C13.0662 2.83382 13.5601 2.64569 14.0894 2.64569C15.2107 2.64569 16.3967 3.52344 16.6006 5.20485C17.3412 5.39095 18.2708 5.78618 18.927 6.62536L18.3923 7.04157C17.7877 6.26803 16.8754 5.9459 16.2169 5.81122C16.0659 5.78077 15.955 5.65286 15.9462 5.49991C15.8576 4.00394 14.9216 3.32244 14.0894 3.32244C13.5934 3.32244 13.1537 3.55592 12.8175 3.99751C12.7425 4.09632 12.6204 4.14741 12.4969 4.12779C12.3744 4.10917 12.2713 4.02559 12.2288 3.90953C11.9686 3.20232 11.5534 2.57767 10.959 2.00006C9.58698 0.675642 7.6932 0.322036 5.8961 1.05564C4.38671 1.67217 3.24813 3.33327 3.24813 4.91959C3.24813 5.10266 3.25865 5.28369 3.28002 5.45728C3.30072 5.6268 3.1908 5.78517 3.02456 5.82645C2.14857 6.04267 0.678532 6.70793 0.678532 8.73008C0.678532 8.79843 0.677853 8.86712 0.684639 8.93581C0.770812 10.468 2.06002 11.5708 3.75059 11.5708Z"
          fill="currentColor"
          className="vpcCollapsedIcon"
        />
      </svg>
      <NodeCounter pointerEvents="none" label={`${props.item.vms && props.item.vms.length ? props.item.vms.length : 0}`} stylesObj={NODES_CONSTANTS.NETWORK_VNET.countStyles} />
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
              pointerEvents: 'none',
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
