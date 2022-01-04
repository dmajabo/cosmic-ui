import React from 'react';
import { ICollapseLabelStyle } from '../../../../model';

interface Props {
  label: string;
  stylesObj: ICollapseLabelStyle;
}

const NodeCollapsedName: React.FC<Props> = ({ label, stylesObj }) => {
  return (
    <text fill={stylesObj.fill} x={stylesObj.x} y={stylesObj.y} textAnchor={stylesObj.textAnchor} fontWeight="500" fontSize={stylesObj.fontSize} fontFamily="DMSans">
      {label}
    </text>
  );
};

export default React.memo(NodeCollapsedName);
