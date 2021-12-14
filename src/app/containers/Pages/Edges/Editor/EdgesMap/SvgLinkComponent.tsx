import React from 'react';
import { SVG_EDGES_STYLES } from './helpers';

interface Props {
  x1: number | string;
  x2: number | string;
  y1: number | string;
  y2: number | string;
}

const SvgLinkComponent: React.FC<Props> = ({ x1, x2, y1, y2 }) => {
  return <line strokeWidth={SVG_EDGES_STYLES.link.strokeWidth} stroke={SVG_EDGES_STYLES.link.color} x1={x1} y1={y1} x2={x2} y2={y2} />;
};

export default React.memo(SvgLinkComponent);
