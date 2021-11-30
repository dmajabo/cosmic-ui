import React from 'react';
import Collapse from '@mui/material/Collapse';
import { BoxWrapper, GroupHeader, GroupItemsWrapper, GroupLabel } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import { DEFAULT_TRANSITION } from 'lib/constants/general';
interface Props {
  defaultOpen?: boolean;
  label: string;
  children?: React.ReactNode;
  disabled?: boolean;
  styles?: Object;
  maxGroupHeight?: string;
}

const FilterGroup: React.FC<Props> = (props: Props) => {
  const [expanded, setExpand] = React.useState<boolean>(props.defaultOpen || false);

  const onToogleExpand = () => {
    if (props.disabled) return;
    setExpand(prev => !prev);
  };
  return (
    <BoxWrapper style={props.styles}>
      <GroupHeader onClick={onToogleExpand} disabled={props.disabled}>
        <GroupLabel>{props.label}</GroupLabel>
        <IconWrapper
          styles={{ margin: '0 0 0 auto', transform: `${expanded ? 'rotate(-180deg)' : 'rotate(0)'}`, transition: `transform ${DEFAULT_TRANSITION}` }}
          width="12px"
          height="12px"
          icon={arrowBottomIcon}
        />
      </GroupHeader>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <GroupItemsWrapper maxHeight={props.maxGroupHeight}>{props.children}</GroupItemsWrapper>
      </Collapse>
    </BoxWrapper>
  );
};

export default React.memo(FilterGroup);
