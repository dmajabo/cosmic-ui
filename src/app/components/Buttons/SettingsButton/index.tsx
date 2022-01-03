import { settingsDotsIcon } from 'app/components/SVGIcons/settingsDots';
import React from 'react';
import IconWrapper from '../IconWrapper';
import { ButtonStyles } from './styles';
import { Popover } from '@mui/material';

interface Props {
  id: string;
  icon?: any;
  width?: string;
  height?: string;
  hoverIconColor?: string;
  buttonStyles?: Object;
  disabled?: boolean;
  disabledCloseAfterClick?: boolean;
  children: React.ReactNode;
}

const SettingsButton: React.FC<Props> = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showPopup, setShowPopup] = React.useState<boolean>(false);

  React.useEffect(() => {
    return () => {
      setAnchorEl(null);
      setShowPopup(false);
    };
  }, []);

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

  const childrenWithProps = React.Children.map(props.children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onClick: () => handleClose() });
    }
    return child;
  });

  return (
    <>
      <ButtonStyles
        width={props.width}
        height={props.height}
        style={props.buttonStyles}
        disabled={props.disabled}
        onClick={handleClick}
        hoverIconColor={props.hoverIconColor}
        className={`${showPopup ? 'active' : ''}`}
        aria-describedby={`${props.id || ''}poper`}
        type="button"
      >
        <IconWrapper icon={props.icon || settingsDotsIcon} />
      </ButtonStyles>
      <Popover
        id={`${props.id || ''}poper`}
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
        {props.disabledCloseAfterClick ? props.children : childrenWithProps}
      </Popover>
    </>
  );
};

export default React.memo(SettingsButton);
