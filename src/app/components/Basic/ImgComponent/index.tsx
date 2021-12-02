import React from 'react';
import { Img } from './style';

interface Props {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  styles?: Object;
  onClick?: () => void;
}

const ImgComponent: React.FC<Props> = (props: Props) => {
  const onClick = () => {
    if (!props.onClick) return;
    props.onClick();
  };
  return <Img onClick={onClick} style={props.styles} src={props.src} alt={props.alt} width={props.width} height={props.height} />;
};

export default React.memo(ImgComponent);
