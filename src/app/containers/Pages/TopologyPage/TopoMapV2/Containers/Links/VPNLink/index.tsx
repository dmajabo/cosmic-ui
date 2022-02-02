import React from 'react';
// import { select } from 'd3-selection';
import { FilterEntityOptions, IDeviceNode, ITGWNode, ITopoLink } from 'lib/hooks/Topology/models';
import { INetworkVpnLinkState } from 'lib/api/ApiModels/Topology/apiModels';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { NODES_CONSTANTS } from '../../../model';
import { select } from 'd3-selection';
import { ICoord } from 'lib/models/general';

interface IProps {
  visible: boolean;
  dataItem: ITopoLink<IDeviceNode, ITGWNode, INetworkVpnLinkState>;
}
const VPNLink: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyV2DataContext();
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const [fromCoord, setFromCoord] = React.useState<ICoord>(null);
  const [toCoord, setToCoord] = React.useState<ICoord>(null);

  React.useEffect(() => {
    const _fromCoord = getFromCoord(props.dataItem, topology.entities);
    const _toCoord = getToCoord(props.dataItem, topology.entities);
    setFromCoord(_fromCoord);
    setToCoord(_toCoord);
  }, [props.dataItem, topology.entities]);

  React.useEffect(() => {
    if (topology.selectedNode && (topology.selectedNode.uiId === props.dataItem.from.uiId || topology.selectedNode.uiId === props.dataItem.to.uiId)) {
      select(`#vpnLink${props.dataItem.extId}`).raise();
      setIsSelected(true);
    } else if (isSelected) {
      setIsSelected(false);
    }
  }, [topology.selectedNode]);

  const getFromCoord = (dataItem: ITopoLink<IDeviceNode, ITGWNode, INetworkVpnLinkState>, filter: FilterEntityOptions): ICoord => {
    if (!dataItem.fromParent.visible) return null;
    if (dataItem.fromParent.collapsed) {
      return { x: props.dataItem.fromParent.x + props.dataItem.fromParent.width / 2, y: props.dataItem.fromParent.y + props.dataItem.toParent.height / 2 - NODES_CONSTANTS.SITES.collapse.height / 2 };
    }
    return { x: props.dataItem.from.x + NODES_CONSTANTS.DEVICE.collapse.width / 2, y: props.dataItem.from.y + NODES_CONSTANTS.DEVICE.collapse.height / 2 };
  };

  const getToCoord = (dataItem: ITopoLink<IDeviceNode, ITGWNode, INetworkVpnLinkState>, filter: FilterEntityOptions): ICoord => {
    if (!dataItem.toParent.visible) return null;
    if (props.dataItem.toParent.collapsed || !filter.transit.selected) {
      return { x: props.dataItem.toParent.x + props.dataItem.toParent.width / 2, y: props.dataItem.toParent.y + props.dataItem.toParent.height / 2 + NODES_CONSTANTS.ACCOUNT.collapse.height / 2 };
    }
    return { x: props.dataItem.to.x + NODES_CONSTANTS.NETWORK_WEDGE.collapse.r, y: props.dataItem.to.y + NODES_CONSTANTS.NETWORK_WEDGE.collapse.height };
  };
  if (!props.visible || !fromCoord || !toCoord) return null;
  return (
    <line
      className={`topologyLink ${isSelected ? 'selectedTopoLevel1Link' : ''}`}
      fill="var(--_defaultLinkFill)"
      stroke="var(--_defaultLinkFill)"
      strokeWidth="1"
      x1={fromCoord.x}
      y1={fromCoord.y}
      x2={toCoord.x}
      y2={toCoord.y}
    />
  );
};

export default React.memo(VPNLink);
