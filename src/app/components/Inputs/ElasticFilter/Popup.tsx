import React from 'react';
import { ListItemsWrapper, ListItem } from './styles';
import { ISelectedListItem } from 'lib/models/general';

interface Props {
  items: ISelectedListItem<string>[];
  selectedItem: ISelectedListItem<string>;
  onSelectItem: (item: ISelectedListItem<string>) => void;
}
const Popup: React.FC<Props> = (props: Props) => {
  const onSelectField = (item: ISelectedListItem<string>) => {
    if (props.selectedItem && item.id === props.selectedItem.id) return;
    props.onSelectItem(item);
  };

  return (
    <ListItemsWrapper>
      {props.items.map(it => (
        <ListItem selected={props.selectedItem && it.id === props.selectedItem.id} onClick={() => onSelectField(it)} key={`suggestField${it.id}`}>
          {it.label}
        </ListItem>
      ))}
    </ListItemsWrapper>
  );
};
export default React.memo(Popup);
