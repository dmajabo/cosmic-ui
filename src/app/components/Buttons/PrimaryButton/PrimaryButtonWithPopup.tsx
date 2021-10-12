import React from 'react';
import IconWrapper from '../IconWrapper';
import { Label } from '../styles/styles';
import { ButtonWrapper, PrimaryButtonStyles, PopupContent } from './styles';
import { ClickAwayListener } from '@material-ui/core';
interface IProps {
  id: string;
  label: JSX.Element | string;
  icon?: JSX.Element;
  children?: React.ReactNode;
  disabled?: boolean;
  styles?: Object;
  wrapStyles?: Object;
  onClick?: (e: any) => void;
  width?: string;
  height?: string;
  bgColor?: string;
  hoverBg?: string;
  color?: string;
  hoverColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
}

const PrimaryButtonWithPopup: React.FC<IProps> = (props: IProps) => {
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (props.disabled) {
      return;
    }
    setShowPopup(!showPopup);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const childrenWithProps = React.Children.map(props.children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onClick: e => {
          props.onClick(e);
          handleClose();
        },
      });
    }
    return child;
  });

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <ButtonWrapper style={props.wrapStyles}>
        <PrimaryButtonStyles
          width={props.width}
          height={props.height}
          bgColor={props.bgColor}
          hoverBg={props.hoverBg}
          color={props.color}
          hoverColor={props.hoverColor}
          borderColor={props.borderColor}
          hoverBorderColor={props.hoverBorderColor}
          style={props.styles}
          disabled={props.disabled}
          onClick={handleClick}
        >
          <Label margin={props.icon ? '0 12px 0 0' : '0'}>{props.label}</Label>
          {props.icon && <IconWrapper icon={props.icon} />}
        </PrimaryButtonStyles>
        {showPopup && <PopupContent>{childrenWithProps}</PopupContent>}
      </ButtonWrapper>
    </ClickAwayListener>
  );
};

export default React.memo(PrimaryButtonWithPopup);
