import React from 'react';
import { NODES_CONSTANTS } from '../../../../model';
import { INetworkWebAclNode, ITopoRegionNode } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import NodeCounter from '../../Containers/NodeCounter';

interface Props {
  parentId: string;
  region: ITopoRegionNode;
  item: INetworkWebAclNode;
  onClick: (item: INetworkWebAclNode) => void;
}

const WebAclNode: React.FC<Props> = (props: Props) => {
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

  return (
    <g
      ref={nodeRef}
      transform={`translate(${props.item.x}, ${props.item.y})`}
      className={`topoNodeLevel1 webaclNodeWrapper ${isNodeSelected ? 'selectedTopoLevel1' : ''}`}
      onClick={onClick}
      cursor="pointer"
    >
      <circle
        fill={NODES_CONSTANTS.WEB_ACL.collapse.bgColor}
        r={NODES_CONSTANTS.WEB_ACL.collapse.r}
        cx={NODES_CONSTANTS.WEB_ACL.collapse.r}
        cy={NODES_CONSTANTS.WEB_ACL.collapse.r}
        className="webAclNode"
        pointerEvents="all"
      />
      <use
        href={`#${NODES_CONSTANTS.WEB_ACL.type}`}
        width={NODES_CONSTANTS.WEB_ACL.collapse.iconWidth}
        height={NODES_CONSTANTS.WEB_ACL.collapse.iconHeight}
        x={0}
        y={0}
        color="#D6242D"
        pointerEvents="none"
        className="webAclNodeIcon"
      />
      <NodeCounter
        pointerEvents="none"
        label={`${props.item.loadBalancers && props.item.loadBalancers.length ? props.item.loadBalancers.length : 0}`}
        stylesObj={NODES_CONSTANTS.WEB_ACL.countStyles}
      />
      <foreignObject
        width={NODES_CONSTANTS.WEB_ACL.labelHtmlStyles.width}
        height={NODES_CONSTANTS.WEB_ACL.labelHtmlStyles.height}
        x={NODES_CONSTANTS.WEB_ACL.labelHtmlStyles.x}
        y={NODES_CONSTANTS.WEB_ACL.labelHtmlStyles.y}
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
              color: NODES_CONSTANTS.WEB_ACL.labelHtmlStyles.fill,
              fontSize: NODES_CONSTANTS.WEB_ACL.labelHtmlStyles.fontSize + 'px',
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

export default React.memo(WebAclNode);
