import React from 'react';
import { NODES_CONSTANTS } from '../../../../model';

interface Props {
  id: string;
  showWebAcls: boolean;
  showPeerConnections: boolean;
  webAclTotalHeight: number;
  peerConnectionTotalHeight: number;
  offsetX: number;
}

const VnetTooltipContainer: React.FC<Props> = (props: Props) => {
  const [offsetTop, setOffsetTop] = React.useState<number>(NODES_CONSTANTS.REGION.expanded.contentPadding + NODES_CONSTANTS.REGION.headerHeight);

  React.useEffect(() => {
    if (props.showWebAcls && props.showPeerConnections) {
      const _ph = props.peerConnectionTotalHeight !== 0 ? props.peerConnectionTotalHeight + NODES_CONSTANTS.REGION.expanded.contentPadding : 0;
      const _wh = props.webAclTotalHeight !== 0 ? props.webAclTotalHeight + NODES_CONSTANTS.REGION.expanded.contentPadding : 0;
      const _off = NODES_CONSTANTS.REGION.headerHeight + NODES_CONSTANTS.REGION.expanded.contentPadding + _ph + _wh;
      setOffsetTop(_off);
    } else if (props.showWebAcls || props.showPeerConnections) {
      let _off = NODES_CONSTANTS.REGION.headerHeight + NODES_CONSTANTS.REGION.expanded.contentPadding;
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
      const _off = NODES_CONSTANTS.REGION.expanded.contentPadding + NODES_CONSTANTS.REGION.headerHeight;
      setOffsetTop(_off);
    }
  }, [props.showWebAcls, props.showPeerConnections, props.webAclTotalHeight, props.peerConnectionTotalHeight]);
  return (
    <foreignObject data-y={offsetTop} id={`vnetTooltipFOContainer${props.id}`} width="0" height="0" pointerEvents="none">
      <div
        id={`vnetTooltipContainer${props.id}`}
        className="vnetTooltipContainer"
        style={{
          background: 'var(--_primaryBg)',
          borderRadius: '6px',
          boxShadow: '0px 10px 30px rgba(5, 20, 58, 0.1)',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          padding: '20px',
          fontFamily: 'DMSans',
        }}
      />
    </foreignObject>
  );
};

export default React.memo(VnetTooltipContainer);
