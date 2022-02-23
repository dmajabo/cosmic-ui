import { IDeviceNode } from 'lib/hooks/Topology/models';
import React from 'react';
import { HeaderNameRow, NodeTooltipBg, NodeTooltipWrapper } from './style';

interface Props {
  id: string;
  item: IDeviceNode;
  x: number | string;
  y: number | string;
  minWidth?: string;
}

const HtmlDeviceTooltip: React.FC<Props> = ({ id, item, x, y, minWidth }) => {
  return (
    <NodeTooltipWrapper id={id} x={x} y={y} width="1" height="1" className="htmlNodeTooltip">
      <NodeTooltipBg className="container" minWidth={minWidth} padding="8px 12px" style={{ display: 'inline-block', maxWidth: 'none' }}>
        <HeaderNameRow className="textOverflowEllips">Device: {item.name || item.extId}</HeaderNameRow>
        {item.vnetworks && item.vnetworks.length && <HeaderNameRow className="textOverflowEllips">Network: {item.vnetworks[0].name}</HeaderNameRow>}
        {item.model && <HeaderNameRow className="textOverflowEllips">Model: {item.model}</HeaderNameRow>}
      </NodeTooltipBg>
    </NodeTooltipWrapper>
  );
};
export default React.memo(HtmlDeviceTooltip);
