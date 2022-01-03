import React from 'react';
import IconWrapper from '../IconWrapper';
import { Label } from '../styles/styles';
import { SecondaryButtonWrapper, SecondaryButtonStyles } from './styles';
import { ClickAwayListener } from '@mui/material';

interface IProps {
  label?: JSX.Element | string;
  icon?: JSX.Element;
  disabled?: boolean;
  styles?: Object;
  withoutBorder?: boolean;
  children?: React.ReactNode;
  direction?: 'rtl' | 'ltr';
  wrapStyles?: Object;
}

const SecondaryButtonWithPopup: React.FC<IProps> = (props: IProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const onShowPopup = () => {
    setOpen(!open);
  };

  const onHidePopup = () => {
    setOpen(false);
  };
  return (
    <ClickAwayListener onClickAway={onHidePopup}>
      <SecondaryButtonWrapper style={props.wrapStyles}>
        <SecondaryButtonStyles className={open ? 'active' : ''} withoutBorder={props.withoutBorder} style={props.styles} disabled={props.disabled} onClick={onShowPopup}>
          {props.label && <Label margin={props.icon ? '0 12px 0 0' : '0'}>{props.label}</Label>}
          {props.icon && <IconWrapper icon={props.icon} />}
        </SecondaryButtonStyles>
        {open && <>{props.children}</>}
      </SecondaryButtonWrapper>
    </ClickAwayListener>
  );
};

export default React.memo(SecondaryButtonWithPopup);
