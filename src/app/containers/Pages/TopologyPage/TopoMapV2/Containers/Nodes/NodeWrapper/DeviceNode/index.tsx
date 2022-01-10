import React from 'react';
import { NODES_CONSTANTS } from '../../../../model';
import { IDeviceNode, ITopoNode } from 'lib/hooks/Topology/models';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/apiModels';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
// import { buildLink, IDeviceLink } from './helper';
// import DeviceLink from './DeviceLink';

interface Props {
  parent: ITopoNode<ITopologyGroup, IDeviceNode>;
  item: IDeviceNode;
  onClick: (item: IDeviceNode) => void;
}

const DeviceNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const [isNodeSelected, setIsNodeSelected] = React.useState<boolean>(false);
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
    <>
      {/* {link && <DeviceLink key={`${link.from.id}${link.to.id}devLink`} data={link} />} */}
      <g transform={`translate(${props.item.x}, ${props.item.y})`} onClick={onClick} className={`topoNodeLevel1 deviceNodeWrapper ${isNodeSelected ? 'selectedTopoLevel1' : ''}`}>
        <use
          className="deviceBg"
          pointerEvents="all"
          href={`#bg${NODES_CONSTANTS.DEVICE.type}`}
          color="var(--_primaryBg)"
          width={NODES_CONSTANTS.DEVICE.collapse.width}
          height={NODES_CONSTANTS.DEVICE.collapse.height}
        />
        <use
          href={`#${NODES_CONSTANTS.DEVICE.type}`}
          width={NODES_CONSTANTS.DEVICE.collapse.iconWidth}
          height={NODES_CONSTANTS.DEVICE.collapse.iconHeight}
          x={NODES_CONSTANTS.DEVICE.collapse.iconOffsetX}
          y={NODES_CONSTANTS.DEVICE.collapse.iconOffsetY}
        />
        <foreignObject
          width={NODES_CONSTANTS.DEVICE.labelHtmlStyles.width}
          height={NODES_CONSTANTS.DEVICE.labelHtmlStyles.height}
          x={NODES_CONSTANTS.DEVICE.labelHtmlStyles.x}
          y={NODES_CONSTANTS.DEVICE.labelHtmlStyles.y}
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
                color: NODES_CONSTANTS.DEVICE.labelHtmlStyles.fill,
                fontSize: NODES_CONSTANTS.DEVICE.labelHtmlStyles.fontSize + 'px',
                textAlign: 'center',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                fontWeight: 500,
              }}
            >
              {props.item.name || props.item.extId}
            </span>
          </div>
        </foreignObject>
      </g>
    </>
  );
};

export default React.memo(DeviceNode);
