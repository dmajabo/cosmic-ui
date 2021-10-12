import React from 'react';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { PopupItemStyles, PopupLabel } from './styles';

interface IProps {
  label: string | JSX.Element;
  icon: JSX.Element | string;
  onClick: () => void;
  color?: string;
}

const PopupItem: React.FC<IProps> = (props: IProps) => {
  return (
    <PopupItemStyles onClick={props.onClick}>
      <IconWrapper icon={props.icon} width="16px" height="16px" />
      <PopupLabel color={props.color}>{props.label}</PopupLabel>
    </PopupItemStyles>
  );
};

export default React.memo(PopupItem);
