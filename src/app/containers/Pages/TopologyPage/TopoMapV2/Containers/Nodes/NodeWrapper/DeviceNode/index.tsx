import React from 'react';
import { NODES_CONSTANTS } from '../../../../model';
import { IDeviceNode } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import HtmlNodeLabel from '../../Containers/HtmlNodeLabel';

interface Props {
  x: number;
  y: number;
  item: IDeviceNode;
  onClick: (item: IDeviceNode) => void;
}

const DeviceNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const [isNodeSelected, setIsNodeSelected] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (topology.selectedNode && topology.selectedNode.id === props.item.id && !isNodeSelected) {
      setIsNodeSelected(true);
    } else if (!topology.selectedNode || (topology.selectedNode && topology.selectedNode !== props.item.id)) {
      setIsNodeSelected(false);
    }
  }, [topology.selectedNode]);

  const onClick = () => {
    props.onClick(props.item);
  };
  return (
    <>
      <g transform={`translate(${props.x}, ${props.y})`} onClick={onClick} className={`topoNodeLevel1 deviceNodeWrapper ${isNodeSelected ? 'selectedTopoLevel1' : ''}`}>
        <use pointerEvents="all" href={`#bg${NODES_CONSTANTS.DEVICE.type}`} color="var(--_primaryBg)" width={NODES_CONSTANTS.DEVICE.collapse.width} height={NODES_CONSTANTS.DEVICE.collapse.height} />
        <use
          href={`#${NODES_CONSTANTS.DEVICE.type}`}
          width={NODES_CONSTANTS.DEVICE.collapse.iconWidth}
          height={NODES_CONSTANTS.DEVICE.collapse.iconHeight}
          x={NODES_CONSTANTS.DEVICE.collapse.iconOffsetX}
          y={NODES_CONSTANTS.DEVICE.collapse.iconOffsetY}
          pointerEvents="none"
        />
        <HtmlNodeLabel name={props.item.name || props.item.extId} labelStyles={NODES_CONSTANTS.DEVICE.labelHtmlStyles} />
      </g>
    </>
  );
};

export default React.memo(DeviceNode);
