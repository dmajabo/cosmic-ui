import React from 'react';
import { Collapse } from '@mui/material';
import { BoxWrapper, GroupHeader, ContentWrapper, GroupLabel } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import { DEFAULT_TRANSITION } from 'lib/constants/general';

interface Props {
  id: string;
  expand: boolean;
  icon?: any;
  label: string;
  children?: React.ReactNode;
  disabled?: boolean;
  styles?: Object;
  maxGroupHeight?: string;
  headerChildren?: React.ReactNode;
  arrowStyles?: Object;
  onToogleExpand: (id: string, state: boolean) => void;
}

const ExpandGroup: React.FC<Props> = (props: Props) => {
  const [expanded, setExpand] = React.useState<boolean>(props.expand || false);

  React.useEffect(() => {
    if (props.expand !== expanded) {
      setExpand(props.expand);
    }
  }, [props.expand]);

  const onToogleExpand = () => {
    if (props.disabled) return;
    const _st = !expanded;
    setExpand(_st);
    props.onToogleExpand(props.id, _st);
  };
  return (
    <BoxWrapper style={props.styles}>
      <GroupHeader onClick={onToogleExpand} disabled={props.disabled}>
        {props.icon && <IconWrapper styles={{ margin: 'auto 12px auto 0' }} width="20px" height="20px" icon={props.icon} />}
        <GroupLabel>{props.label}</GroupLabel>
        {props.headerChildren && <>{props.headerChildren}</>}
        {!props.disabled && (
          <IconWrapper
            styles={{ margin: '0 0 0 auto', transform: `${expanded ? 'rotate(-180deg)' : 'rotate(0)'}`, transition: `transform ${DEFAULT_TRANSITION}`, ...props.arrowStyles }}
            width="12px"
            height="12px"
            icon={arrowBottomIcon}
          />
        )}
      </GroupHeader>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <ContentWrapper margin={expanded ? '0 0 20px 0' : '0'} maxHeight={props.maxGroupHeight}>
          {props.children}
        </ContentWrapper>
      </Collapse>
    </BoxWrapper>
  );
};

export default React.memo(ExpandGroup);
