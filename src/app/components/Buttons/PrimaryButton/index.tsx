import React from 'react';
import IconWrapper from '../IconWrapper';
import { Label } from '../styles/styles';
import { PrimaryButtonStyles } from './styles';

interface IProps {
  label: JSX.Element | string;
  icon?: JSX.Element;
  type?: 'button' | 'submit';
  onClick: () => void;
  disabled?: boolean;
  styles?: Object;
  color?: string;
  bgColor?: string;
  borderColor?: string;
  hoverColor?: string;
  hoverBg?: string;
  hoverBorder?: string;
  disabledColor?: string;
  disabledBg?: string;
  disabledBorder?: string;
}

const PrimaryButton: React.FC<IProps> = ({
  label,
  icon,
  type,
  onClick,
  disabled,
  styles,
  color,
  bgColor,
  borderColor,
  hoverColor,
  hoverBg,
  hoverBorder,
  disabledColor,
  disabledBg,
  disabledBorder,
}) => {
  return (
    <PrimaryButtonStyles
      color={color}
      bgColor={bgColor}
      borderColor={borderColor}
      hoverColor={hoverColor}
      hoverBg={hoverBg}
      hoverBorder={hoverBorder}
      disabledColor={disabledColor}
      disabledBg={disabledBg}
      disabledBorder={disabledBorder}
      type={type || 'button'}
      style={styles}
      disabled={disabled}
      onClick={onClick}
    >
      <Label margin={icon ? '0 12px 0 0' : '0'}>{label}</Label>
      {icon && <IconWrapper icon={icon} />}
    </PrimaryButtonStyles>
  );
};

export default React.memo(PrimaryButton);
