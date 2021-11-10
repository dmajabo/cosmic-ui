import React from 'react';
import { Icon } from './styles';

interface IProps {
  width?: string;
  height?: string;
  styles?: Object;
  icon: JSX.Element | string;
  isIconasStrign?: boolean;
  customIcon?: boolean;
  title?: string;
  onClick?: (e: any) => void;
  disabled?: boolean;
  classes?: string;
}

const IconWrapper: React.FC<IProps> = (props: IProps) => {
  const onClick = e => {
    if (!props.onClick) {
      return;
    }
    props.onClick(e);
  };
  return (
    <Icon className={props.classes} title={props.title} style={props.styles} width={props.width} height={props.height} onClick={onClick} disabled={props.disabled}>
      {!props.customIcon && <>{!props.isIconasStrign ? <>{props.icon}</> : <img src={props.icon as string} width="100%" height="100%" alt="" />}</>}
      {props.customIcon && <>{props.customIcon}</>}
    </Icon>
  );
};

export default React.memo(IconWrapper);
