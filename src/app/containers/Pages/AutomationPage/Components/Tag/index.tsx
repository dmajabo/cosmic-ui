import React from 'react';
import { Label, TagWrapper } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { ISelectedListItem } from 'lib/models/general';
import { closeSmallIcon } from 'app/components/SVGIcons/close';

interface Props {
  item: ISelectedListItem<any> | string | number;
  onDelete: (item: ISelectedListItem<any> | string | number) => void;
}

const Tag: React.FC<Props> = (props: Props) => {
  const onDelete = () => {
    props.onDelete(props.item);
  };
  return (
    <TagWrapper>
      <Label>{typeof props.item === 'string' || typeof props.item === 'number' ? props.item : props.item.label}</Label>
      <IconWrapper onClick={onDelete} styles={{ margin: 'auto 0 auto 8px' }} width="12px" height="12px" icon={closeSmallIcon} />
    </TagWrapper>
  );
};

export default React.memo(Tag);
