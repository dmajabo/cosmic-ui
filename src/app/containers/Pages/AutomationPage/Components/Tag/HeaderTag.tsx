import React from 'react';
import { HighLightLabel, HeaderTagWrapper, SubLabel } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';

interface Props {
  highLightValue: string;
  subLabel?: string;
  icon?: any;
}

const HeaderTag: React.FC<Props> = (props: Props) => {
  return (
    <HeaderTagWrapper>
      {props.icon && <IconWrapper styles={{ margin: 'auto 10px auto 0' }} width="16px" height="16px" icon={props.icon} />}
      <HighLightLabel>{props.highLightValue}</HighLightLabel>
      {props.subLabel && <SubLabel>{props.subLabel}</SubLabel>}
    </HeaderTagWrapper>
  );
};

export default React.memo(HeaderTag);
