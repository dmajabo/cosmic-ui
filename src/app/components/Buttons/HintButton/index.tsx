import React from 'react';
import IconWrapper from '../IconWrapper';
import { Tooltip, ClickAwayListener, Fade } from '@mui/material';
import { withStyles } from '@mui/styles';
import { TooltipPlacement } from 'lib/models/general';

export interface IProps {
  icon: JSX.Element;
  title?: JSX.Element | string;
  placement?: TooltipPlacement;
  arrow?: boolean;
  disabled?: boolean;
  className?: string;
  classNameWrapper?: string;
  width?: string;
  height?: string;
  margin?: string;
  children?: any;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  iconStyles?: object;
}

const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: 'var(--_primaryBg)',
    color: 'var(--_primaryTextColor)',
    maxWidth: 220,
    fontSize: 12,
    border: '1px solid',
    borderColor: 'var(--_disabledButtonBg)',
    padding: '2px 8px',
    margin: '8px 0 0 0',
    whiteSpace: 'normal',
  },
  arrow: {
    color: 'var(--_disabledButtonBg)',
    width: '16px',
    height: '8px',
    marginLeft: '8px',
  },
}))(Tooltip);

const HintButton: React.FC<IProps> = (props: IProps) => {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
  };
  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <HtmlTooltip
        title={props.children}
        arrow={props.arrow || false}
        placement={props.placement || TooltipPlacement.BOTTOM_START}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        TransitionComponent={Fade}
        enterDelay={500}
        leaveDelay={200}
        PopperProps={{
          disablePortal: true,
        }}
        className={props.classNameWrapper || null}
      >
        <span>
          <IconWrapper title="Example" onClick={handleTooltipOpen} styles={props.iconStyles} width={props.width || '40px'} height={props.height || '40px'} icon={props.icon} />
        </span>
      </HtmlTooltip>
    </ClickAwayListener>
  );
};

export default React.memo(HintButton);
