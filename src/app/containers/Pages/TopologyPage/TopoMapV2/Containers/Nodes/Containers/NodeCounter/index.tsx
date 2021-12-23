import React from 'react';
import { ICounterStyle } from '../../../../model';
import { CounteBg, CounteLable, CounterWrapper } from './styles';

interface Props {
  label: string;
  stylesObj: ICounterStyle;
}

const NodeCounter: React.FC<Props> = ({ label, stylesObj }) => {
  return (
    <foreignObject className="nodeCounter" width={stylesObj.width} height={stylesObj.height} x={stylesObj.x} y={stylesObj.y}>
      <CounterWrapper>
        <CounteBg bgColor={stylesObj.fill} width={stylesObj.cWidth} minWidth={stylesObj.cMinWidth}>
          <CounteLable color={stylesObj.color}>{label}</CounteLable>
        </CounteBg>
      </CounterWrapper>
    </foreignObject>
  );
};

export default React.memo(NodeCounter);
