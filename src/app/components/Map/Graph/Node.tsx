import React from 'react';
import { IWedgeNode, IVnetNode, IDeviceNode, INetworkGroupNode } from 'lib/models/topology';
import { drawNode } from './helper';

interface Props {
  node: IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode;
}

const Node: React.FC<Props> = (props: Props) => {
  const gRef = React.useRef(null);
  React.useEffect(() => {
    drawNode(gRef.current, props.node);
  }, [props.node]);

  return <g ref={gRef} className="topologyNode" />;
};

export default React.memo(Node);
