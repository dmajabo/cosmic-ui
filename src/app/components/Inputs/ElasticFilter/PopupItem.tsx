import React from 'react';
import { ListItem } from './styles';
import { IElasticField } from 'lib/api/ApiModels/paramBuilders';

interface Props {
  item: IElasticField | string;
  selected: boolean;
  index: number;
  onSelect: (item: IElasticField | string) => void;
}

const PopupItem = (props: Props) => {
  const onSelect = () => {
    props.onSelect(props.item);
  };
  if (typeof props.item === 'string') {
    return (
      <ListItem tabIndex={0} selected={props.selected} onClick={onSelect}>
        {props.item}
      </ListItem>
    );
  }

  return (
    <ListItem tabIndex={0} selected={props.selected} onClick={onSelect}>
      {props.item.label}
    </ListItem>
  );
};

export default PopupItem;
