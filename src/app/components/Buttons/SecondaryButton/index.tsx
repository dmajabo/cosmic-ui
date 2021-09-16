import React from 'react';
import IconWrapper from '../IconWrapper';
import { Label } from '../styles/styles';
import { SecondaryButtonStyles } from './styles';

interface IProps {
  label: JSX.Element | string;
  icon?: JSX.Element;
  onClick: () => void;
  disabled?: boolean;
  styles?: Object;
}

const SecondaryButton: React.FC<IProps> = (props: IProps) => {
  return (
    <SecondaryButtonStyles style={props.styles} disabled={props.disabled} onClick={props.onClick}>
      <Label margin={props.icon ? '0 12px 0 0' : '0'}>{props.label}</Label>
      {props.icon && <IconWrapper icon={props.icon} />}
    </SecondaryButtonStyles>
  );
};

export default React.memo(SecondaryButton);
