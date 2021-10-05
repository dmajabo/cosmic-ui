import React from 'react';
import { IDeviceNode, IVnetNode, IWedgeNode, INetworkGroupNode, TOPOLOGY_NODE_TYPES, IVPC_PanelDataNode } from 'lib/models/topology';
import Device from '../Device';
import WEdgeNode from '../WEdge';
import VNetNode from '../VNet';
import GroupNode from '../GroupNode';
interface Props {
  dataItem: IDeviceNode | IVnetNode | IWedgeNode | INetworkGroupNode;
  onClickDevice: (_node: IDeviceNode) => void;
  onClickWedge: (_node: IWedgeNode) => void;
  onClickVpc: (_data: IVPC_PanelDataNode) => void;
}

const NodesWrapper: React.FC<Props> = (props: Props) => {
  const onClickVpc = (_data: IVPC_PanelDataNode) => {
    props.onClickVpc(_data);
  };
  const onClickDevice = (dev: IDeviceNode) => {
    props.onClickDevice(dev);
  };
  const onClickWedge = (wedge: IWedgeNode) => {
    props.onClickWedge(wedge);
  };

  if (props.dataItem.nodeType === TOPOLOGY_NODE_TYPES.DEVICE) {
    return <Device dataItem={props.dataItem as IDeviceNode} onClickDevice={onClickDevice} />;
  }
  if (props.dataItem.nodeType === TOPOLOGY_NODE_TYPES.WEDGE) {
    return <WEdgeNode dataItem={props.dataItem as IWedgeNode} onClick={onClickWedge} />;
  }
  if (props.dataItem.nodeType === TOPOLOGY_NODE_TYPES.VNET) {
    return <VNetNode dataItem={props.dataItem as IVnetNode} onClickVpc={onClickVpc} />;
  }
  if (props.dataItem.nodeType === TOPOLOGY_NODE_TYPES.NETWORK_GROUP) {
    return <GroupNode dataItem={props.dataItem as INetworkGroupNode} onClickDevice={onClickDevice} />;
  }
  return null;
};

export default React.memo(NodesWrapper);
