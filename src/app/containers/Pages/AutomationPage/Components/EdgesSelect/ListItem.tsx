import React from 'react';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { ListItemStyles, ItemLabel } from './styles';

interface IProps {
  item: any;
  selected: boolean;
  onClick: (item: any) => void;
}

const ListItem: React.FC<IProps> = (props: IProps) => {
  const [displayValue, setDisplayedValue] = React.useState<string>(typeof props.item === 'string' ? props.item : props.item.value);

  React.useEffect(() => {
    setDisplayedValue(typeof props.item === 'string' ? props.item : props.item.value);
  }, [props.item]);
  const onClick = () => {
    props.onClick(props.item);
  };
  return (
    <ListItemStyles onClick={onClick} className={props.selected ? 'selected' : ''}>
      <SimpleCheckbox isChecked={props.selected} readOnly />
      <ItemLabel primary>{displayValue}</ItemLabel>
      <ItemLabel>{displayValue}</ItemLabel>
    </ListItemStyles>
  );
};

export default React.memo(ListItem);
