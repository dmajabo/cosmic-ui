import React from 'react';
import { Wrapper } from './styles';

interface IProps {
  width?: string;
  height?: string;
  children?: React.ReactNode;
  styles?: Object;
}

const PopupContainer = (props: IProps) => (
  <Wrapper style={props.styles} width={props.width} height={props.height}>
    {props.children}
  </Wrapper>
);

export default React.memo(PopupContainer);
