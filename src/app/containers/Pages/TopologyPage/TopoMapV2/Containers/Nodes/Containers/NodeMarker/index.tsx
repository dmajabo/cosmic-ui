import React from 'react';
import { IMarker } from '../../../../model';

interface Props {
  iconId: string;
  fill?: string;
  stylesObj: IMarker;
}

const NodeMarker: React.FC<Props> = ({ iconId, fill, stylesObj }) => {
  return (
    <g>
      <svg width={stylesObj.width} height={stylesObj.height} viewBox={stylesObj.viewBox} pointerEvents="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 6C0 2.68629 2.68629 0 6 0H30V24C30 27.3137 27.3137 30 24 30H0V6Z" fill={fill || stylesObj.bgColor} />
      </svg>
      <use pointerEvents="none" href={`#${iconId}`} width={stylesObj.iconWidth} height={stylesObj.iconHeight} x={stylesObj.iconOffsetX} y={stylesObj.iconOffsetY} color={stylesObj.iconColor || null} />
    </g>
  );
};

export default React.memo(NodeMarker);
