import React from 'react';
import { IDeviceNode, IWedgeNode, IVPC_PanelDataNode } from 'lib/models/topology';
import { ITopoNode, TopoNodeTypes } from 'lib/hooks/Topology/models';
import RegionNode from './RegionNode';
import AccountNode from './AccountNode';
import DataCenter from './DataCenter';
import SitesNode from './SitesNode';

interface Props {
  dataItem: ITopoNode;
  onClickDevice: (_node: IDeviceNode) => void;
  onClickWedge: (_node: IWedgeNode) => void;
  onClickVpc: (_data: IVPC_PanelDataNode) => void;
}

const NodesWrapper: React.FC<Props> = (props: Props) => {
  // const onClickVpc = (_data: IVPC_PanelDataNode) => {
  //   props.onClickVpc(_data);
  // };
  // const onClickDevice = (dev: IDeviceNode) => {
  //   props.onClickDevice(dev);
  // };
  // const onClickWedge = (wedge: IWedgeNode) => {
  //   props.onClickWedge(wedge);
  // };

  if (props.dataItem.type === TopoNodeTypes.ACCOUNT) {
    return <AccountNode dataItem={props.dataItem} />;
  }

  if (props.dataItem.type === TopoNodeTypes.REGION) {
    return <RegionNode dataItem={props.dataItem} />;
  }

  if (props.dataItem.type === TopoNodeTypes.DATA_CENTER) {
    return <DataCenter dataItem={props.dataItem} />;
  }

  if (props.dataItem.type === TopoNodeTypes.SITES) {
    return <SitesNode dataItem={props.dataItem} />;
  }

  return null;
};

export default React.memo(NodesWrapper);
