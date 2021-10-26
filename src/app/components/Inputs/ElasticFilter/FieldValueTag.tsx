import React from 'react';
import { ISelectionGridCellValue } from 'lib/models/general';
import { TagItem, TagItemLabel, TextWrapper } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { closeIcon } from 'app/components/SVGIcons/close';
import { ISessionsGridField } from 'app/containers/Pages/SessionsPage/SessionPage/models';

interface Props {
  item: ISelectionGridCellValue<ISessionsGridField, ISessionsGridField>;
  index: number;
  onRemoveTag: (index: number) => void;
  onSelectTag: (_item: ISelectionGridCellValue<ISessionsGridField, ISessionsGridField>, index: number) => void;
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
      <TextWrapper onClick={onSelect}>
        <TagItemLabel fontSize="12px" lineHeight="23px" color="var(--_primaryColor)">
          {item.field.label}:
        </TagItemLabel>
        <TagItemLabel padding="4px 0 2px 4px" lineHeight="16px">
          {item.value.label}
        </TagItemLabel>
      </TextWrapper>
      <IconWrapper styles={{ margin: 'auto 0 auto 8px' }} width="10px" height="10px" icon={closeIcon} onClick={onRemove} />
    </TagItem>
  );
};

export default React.memo(FieldValueTag);
