import { ISelectedListItem } from 'lib/models/general';
import React from 'react';
import { Wrapper } from './styles';
import ToogleButton from './ToogleButton';

interface IProps {
  selectedValue: ISelectedListItem<any> | null;
  values: ISelectedListItem<any>[];
  onChange: (value: ISelectedListItem<any>) => void;
}
const Toogle: React.FC<IProps> = (props: IProps) => {
  const onChange = (value: ISelectedListItem<any>) => {
    if (value.id === props.selectedValue.id) {
      return;
    }
    props.onChange(value);
  };

  return (
    <Wrapper>
      {props.values.map((it, index) => (
        <ToogleButton key={`tooglebutton${index}`} value={it} onClick={onChange} isSelected={props.selectedValue && it.id === props.selectedValue.id} />
      ))}
    </Wrapper>
  );
};

export default React.memo(Toogle);
