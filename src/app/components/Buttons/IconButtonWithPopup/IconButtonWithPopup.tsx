import React from 'react';
import Popover from '@material-ui/core/Popover';
import IconWrapper from '../IconWrapper';
import { ButtonStyles, PopupContent } from './styles';
interface Props {
  id?: string;
  icon: JSX.Element | string;
  title?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  styles?: Object;
  iconStyles?: Object;
  buttonWidth?: string;
  buttonHeight?: string;
  iconWidth?: string;
  iconHeight?: string;
  hoverIconColor?: string;
  className?: string;
  active?: boolean;
  customIcon?: boolean;
}

const IconButtonWithPopup: React.FC<Props> = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (props.disabled) {
      return;
    }
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setShowPopup(!showPopup);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowPopup(false);
  };

  return (
    <>
      <ButtonStyles
        width={props.buttonWidth}
        height={props.buttonHeight}
        title={props.title}
        style={props.styles}
        disabled={props.disabled}
        onClick={handleClick}
        hoverIconColor={props.hoverIconColor}
        className={`${props.className} ${props.active ? 'active' : ''}`}
        aria-describedby={`${props.id || ''}poper`}
        type="button"
      >
        <IconWrapper customIcon={props.customIcon} styles={props.iconStyles} width={props.iconWidth || '100%'} height={props.iconHeight || '100%'} icon={props.icon} />
      </ButtonStyles>
      <Popover
        id={props.id}
        open={showPopup}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className="buttonPopup"
      >
        <PopupContent>{props.children}</PopupContent>
      </Popover>
    </>
  );
};

export default React.memo(IconButtonWithPopup);
