import React from 'react';
import { IGroupedFilteredItem } from './model';
import { StyledTag } from './styles';

interface GroupTagProps {
  item: IGroupedFilteredItem;
  onDelete: (id: string) => void;
  onSelectGroup: (_gr: IGroupedFilteredItem) => void;
}

const GroupTag: React.FC<GroupTagProps> = (props: GroupTagProps) => {
  const onRemoveGroup = () => {
    props.onDelete(props.item.id);
  };
  const onSelectGroup = () => {
    props.onSelectGroup(props.item);
  };
  return (
    <StyledTag>
      <div onClick={onSelectGroup}>
        <span>{props.item.label}</span>
        <span>
          {props.item.items.map(it => {
            if (!it.selected) return null;
            return <span key={`groupItemSelected${it.id}`}>{it.label}</span>;
          })}
        </span>
      </div>
      <span onClick={onRemoveGroup}>X</span>
    </StyledTag>
  );
};

export default React.memo(GroupTag);
