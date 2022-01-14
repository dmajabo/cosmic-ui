import React from 'react';
import { IRefionContainersOffsets } from '../../NodeWrapper/RegionNode/ExpandNodeContent/helper';

interface Props {
  id: string;
  offsetData: IRefionContainersOffsets;
  offsetX: number;
}

const VnetTooltipContainer: React.FC<Props> = (props: Props) => {
  return (
    <foreignObject
      id={`vnetTooltipFOContainer${props.id}`}
      width="0"
      height="0"
      data-y={props.offsetData.topOffset + props.offsetData.webAcl_TotalHeight + props.offsetData.peerConnection_TotalHeight}
      pointerEvents="none"
    >
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
