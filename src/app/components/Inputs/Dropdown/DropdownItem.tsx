import React from 'react';
import { ISelectedListItem } from 'lib/models/general';
import { DropdownItemWrapper } from './styles';

interface IProps {
  label: JSX.Element | string;
  item: ISelectedListItem<any>;
  onClick: (_item: ISelectedListItem<any>) => void;
  active: boolean;
}

const DropdownItem: React.FC<IProps> = (props: IProps) => {
  const onClick = () => {
    props.onClick(props.item);
  };

  return (
    <DropdownItemWrapper active={props.active} onClick={onClick}>
      {props.item.label}
    </DropdownItemWrapper>
  );
};

export default React.memo(DropdownItem);
