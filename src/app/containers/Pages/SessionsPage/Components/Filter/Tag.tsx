import React from 'react';
import { IAutoCompliteItem } from './model';
import { StyledTag } from './styles';

interface TagProps {
  item: IAutoCompliteItem;
  selected: boolean;
  onDelete: () => void;
}

const Tag: React.FC<TagProps> = (props: TagProps) => {
  const { item, onDelete, ...other } = props;
  return (
    <StyledTag {...other} onClick={onDelete}>
      <span>{item.label}</span>
      {/* <CloseIcon onClick={onDelete} /> */}
    </StyledTag>
  );
};

export default React.memo(Tag);
