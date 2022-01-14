import React from 'react';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';

interface Props {
  headerHeight: number;
  showWebAcls: boolean;
  showPeerConnections: boolean;
  webAclTotalHeight: number;
  peerConnectionTotalHeight: number;
  offsetX: number;
  children: React.ReactNode;
}

const VpcContainer: React.FC<Props> = (props: Props) => {
  const [offsetTop, setOffsetTop] = React.useState<number>(NODES_CONSTANTS.REGION.expanded.contentPadding + props.headerHeight);

  React.useEffect(() => {
    if (props.showWebAcls && props.showPeerConnections) {
      const _ph = props.peerConnectionTotalHeight !== 0 ? props.peerConnectionTotalHeight + NODES_CONSTANTS.REGION.expanded.contentPadding : 0;
      const _wh = props.webAclTotalHeight !== 0 ? props.webAclTotalHeight + NODES_CONSTANTS.REGION.expanded.contentPadding : 0;
      const _off = props.headerHeight + NODES_CONSTANTS.REGION.expanded.contentPadding + _ph + _wh;
      setOffsetTop(_off);
    } else if (props.showWebAcls || props.showPeerConnections) {
      let _off = props.headerHeight + NODES_CONSTANTS.REGION.expanded.contentPadding;
      if (props.showWebAcls) {
        _off += props.webAclTotalHeight;
        if (props.webAclTotalHeight !== 0) {
          _off += NODES_CONSTANTS.REGION.expanded.contentPadding;
        }
      }
      if (props.showPeerConnections) {
        _off += props.peerConnectionTotalHeight;
        if (props.peerConnectionTotalHeight !== 0) {
          _off += NODES_CONSTANTS.REGION.expanded.contentPadding;
        }
      }
      setOffsetTop(_off);
    } else {
      const _off = NODES_CONSTANTS.REGION.expanded.contentPadding + props.headerHeight;
      setOffsetTop(_off);
    }
  }, [props.showWebAcls, props.showPeerConnections, props.webAclTotalHeight, props.peerConnectionTotalHeight]);

  return <g transform={`translate(${props.offsetX}, ${offsetTop})`}>{props.children}</g>;
};

export default React.memo(VpcContainer);
