import React from 'react';
import { TagBg, TagItem, TagItemLabel, TextWrapper } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import { IElasticFilterModel } from 'lib/api/ApiModels/paramBuilders';

interface Props {
  item: IElasticFilterModel;
  index: number;
  onRemoveTag: (index: number) => void;
  onSelectTag: (_item: IElasticFilterModel, index: number) => void;
}

const FieldValueTag: React.FC<Props> = ({ item, index, onRemoveTag, onSelectTag }) => {
  const onRemove = () => {
    onRemoveTag(index);
  };

  const onSelect = () => {
    onSelectTag(item, index);
  };

  return (
    <TagItem>
      <TagBg />
      <TextWrapper onClick={onSelect}>
        <TagItemLabel color="var(--_primaryTextColor)">{item.field.label}:</TagItemLabel>
        <TagItemLabel padding="0 0 0 4px">{item.value}</TagItemLabel>
      </TextWrapper>
      <IconWrapper styles={{ margin: 'auto 0 auto 8px', zIndex: 1 }} width="10px" height="10px" icon={closeSmallIcon} onClick={onRemove} />
    </TagItem>
  );
};

export default React.memo(FieldValueTag);
