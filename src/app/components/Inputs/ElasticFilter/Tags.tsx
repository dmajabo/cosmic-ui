import React from 'react';
import { ISelectionGridCellValue } from 'lib/models/general';
import { TagItem, TagItemLabel, TagsWrapper, TextWrapper } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { closeIcon } from 'app/components/SVGIcons/close';
import { ISessionsGridField } from 'app/containers/Pages/SessionsPage/SessionPage/models';

interface Props {
  items: ISelectionGridCellValue<ISessionsGridField, ISessionsGridField>[];
  onRemoveTag: (index: number) => void;
  onSelectTag: (_item: ISelectionGridCellValue<ISessionsGridField, ISessionsGridField>, index: number) => void;
}

const Tags: React.FC<Props> = (props: Props) => {
  const onRemoveItem = (index: number) => {
    props.onRemoveTag(index);
  };

  const onSelectTag = (item: ISelectionGridCellValue<ISessionsGridField, ISessionsGridField>, index: number) => {
    props.onSelectTag(item, index);
  };

  if (!props.items || !props.items.length) return null;
  return (
    <TagsWrapper>
      {props.items.map((it, index) => (
        <TagItem key={`tagFilterItem${index}${it.field}`}>
          <TextWrapper onClick={() => onSelectTag(it, index)}>
            <TagItemLabel fontSize="12px" lineHeight="23px" color="var(--_primaryColor)">
              {it.field.label}:
            </TagItemLabel>
            <TagItemLabel padding="4px 0 2px 4px" lineHeight="16px">
              {it.value.label}
            </TagItemLabel>
          </TextWrapper>
          <IconWrapper styles={{ margin: 'auto 0 auto 8px' }} width="10px" height="10px" icon={closeIcon} onClick={() => onRemoveItem(index)} />
        </TagItem>
      ))}
    </TagsWrapper>
  );
};

export default React.memo(Tags);
