import { ISelectedListItem } from 'lib/models/general';
import React from 'react';
import { Wrapper } from './styles';
import ToogleButton from './ToogleButton';

interface IProps {
  selectedValue: ISelectedListItem<string> | null;
  values: ISelectedListItem<string>[];
  onChange: (value: ISelectedListItem<string>) => void;
}
const Toogle: React.FC<IProps> = (props: IProps) => {
  const onChange = (value: ISelectedListItem<string>) => {
    if (value === props.selectedValue) {
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
