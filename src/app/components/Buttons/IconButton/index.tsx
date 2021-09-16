import React from 'react';
import IconWrapper from '../IconWrapper';
import { Button } from './styles';
interface Props {
  icon: JSX.Element;
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  styles?: Object;
  iconStyles?: Object;
}

const IconButton: React.FC<Props> = (props: Props) => {
  const onClick = () => {
    if (!props.onClick || props.disabled) {
      return;
    }
    props.onClick();
  };
  return (
    <Button title={props.title} style={props.styles} disabled={props.disabled} onClick={onClick}>
      <IconWrapper styles={props.iconStyles} width="16px" height="16px" icon={props.icon} />
      {props.children}
    </Button>
  );
};

export default React.memo(IconButton);
