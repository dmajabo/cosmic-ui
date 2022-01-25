import React from 'react';
import { NodeTooltipBg, NodeTooltipWrapper } from './style';

interface Props {
  id: string;
  name: string;
  x: number | string;
  y: number | string;
  minWidth?: string;
}

const HtmlNodeTooltip: React.FC<Props> = ({ id, name, x, y, minWidth }) => {
  return (
    <NodeTooltipWrapper id={id} x={x} y={y} width="1" height="1" className="htmlNodeTooltip">
      <NodeTooltipBg className="container" minWidth={minWidth}>
        {name}
      </NodeTooltipBg>
    </NodeTooltipWrapper>
  );
};
export default React.memo(HtmlNodeTooltip);
