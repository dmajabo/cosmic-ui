import React from 'react';
import IconWrapper from '../IconWrapper';
import { Label } from '../styles/styles';
import { PrimaryButtonStyles } from './styles';

interface IProps {
  label: JSX.Element | string;
  icon?: JSX.Element;
  onClick: () => void;
  disabled?: boolean;
  styles?: Object;
  bgColor?: string;
  hoverBg?: string;
  color?: string;
  hoverColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
}

const PrimaryButton: React.FC<IProps> = (props: IProps) => {
  return (
    <PrimaryButtonStyles
      bgColor={props.bgColor}
      hoverBg={props.hoverBg}
      color={props.color}
      hoverColor={props.hoverColor}
      borderColor={props.borderColor}
      hoverBorderColor={props.hoverBorderColor}
      style={props.styles}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <Label margin={props.icon ? '0 12px 0 0' : '0'}>{props.label}</Label>
      {props.icon && <IconWrapper icon={props.icon} />}
    </PrimaryButtonStyles>
  );
};

export default React.memo(PrimaryButton);
