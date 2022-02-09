import React from 'react';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import { TagBg, TagStyles, TagText } from './style';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import Popover from '@mui/material/Popover';
import { PopupContent } from 'app/components/Buttons/IconButtonWithPopup/styles';
interface Props {
  text: string;
  subText?: string;
  index: number;
  hideClearButton?: boolean;
  onRemove?: (index: number, e: any) => void;
  styles?: Object;
  bgColor?: string;
  textColor?: string;
  subTextColor?: string;
  opacity?: string | number;
  showPopup?: boolean;
  children?: React.ReactNode;
}

const Tag: React.FC<Props> = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (!props.showPopup) return;
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    if (!props.showPopup) return;
    setAnchorEl(null);
  };

  const onDelete = e => {
    props.onRemove(props.index, e);
  };
  return (
    <TagStyles style={props.styles} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
      <TagBg bgColor={props.bgColor} opacity={props.opacity} />
      <TagText className={props.hideClearButton ? 'textSimple' : ''} color={props.textColor}>
        {props.text}
      </TagText>
      {props.subText && (
        <TagText isSubText color={props.subTextColor}>
          {props.subText}
        </TagText>
      )}
      {!props.hideClearButton && <IconWrapper styles={{ zIndex: 2 }} width="10px" height="10px" icon={closeSmallIcon} onClick={onDelete} />}
      {props.showPopup && (
        <Popover
          id={`${props.text}${props.index}`}
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          sx={{
            pointerEvents: 'none',
          }}
          className="tagPopup"
        >
          <PopupContent style={{ background: 'var(--_primaryBg)', padding: '12px 20px', maxWidth: '400px' }}>{props.children}</PopupContent>
        </Popover>
      )}
    </TagStyles>
  );
};

export default React.memo(Tag);
