import React from 'react';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import { TagBg, TagStyles, TagText } from './style';
import IconWrapper from 'app/components/Buttons/IconWrapper';

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
}

const Tag: React.FC<Props> = ({ text, subText, index, hideClearButton, styles, bgColor, textColor, subTextColor, opacity, onRemove }) => {
  const onDelete = e => {
    onRemove(index, e);
  };
  return (
    <TagStyles style={styles}>
      <TagBg bgColor={bgColor} opacity={opacity} />
      <TagText className={hideClearButton ? 'textSimple' : ''} color={textColor}>
        {text}
      </TagText>
      {subText && (
        <TagText isSubText color={subTextColor}>
          {subText}
        </TagText>
      )}
      {!hideClearButton && <IconWrapper styles={{ zIndex: 2 }} width="12px" height="12px" icon={closeSmallIcon} onClick={onDelete} />}
    </TagStyles>
  );
};

export default React.memo(Tag);
