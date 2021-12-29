import React from 'react';
import { IDeviceNode, IVPC_PanelDataNode } from 'lib/models/topology';
import { ITGWNode, ITopoNode, TopoNodeTypes } from 'lib/hooks/Topology/models';
import RegionNode from './RegionNode';
import AccountNode from './AccountNode';
import DataCenter from './DataCenter';
import SitesNode from './SitesNode';

interface Props {
  dataItem: ITopoNode<any>;
  onClickDevice: (_node: IDeviceNode) => void;
  onClickWedge: (_node: ITGWNode) => void;
  onClickVpc: (_data: IVPC_PanelDataNode) => void;
}

const NodesWrapper: React.FC<Props> = (props: Props) => {
  if (props.dataItem.type === TopoNodeTypes.ACCOUNT && props.dataItem.visible) {
    return <AccountNode dataItem={props.dataItem} />;
  }

  if (props.dataItem.type === TopoNodeTypes.REGION && props.dataItem.visible) {
    return <RegionNode dataItem={props.dataItem} />;
  }

  if (props.dataItem.type === TopoNodeTypes.DATA_CENTER && props.dataItem.visible) {
    return <DataCenter dataItem={props.dataItem} />;
  }

  if (props.dataItem.type === TopoNodeTypes.SITES && props.dataItem.visible) {
    return <SitesNode dataItem={props.dataItem} />;
  }

  return null;
};

export default React.memo(NodesWrapper);
