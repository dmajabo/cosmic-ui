import { ISelectedListItem } from 'lib/models/general';
import React from 'react';
import { Wrapper } from './styles';
import ToogleButton from './ToogleButton';

interface IProps {
  selectedValue: ISelectedListItem<any> | null;
  values: ISelectedListItem<any>[];
  onChange: (value: ISelectedListItem<any>) => void;
  styles?: Object;
  buttonStyles?: Object;
}
const Toogle: React.FC<IProps> = ({ selectedValue, values, onChange, styles, buttonStyles }) => {
  const onToogleChange = (value: ISelectedListItem<any>) => {
    if (value.id === selectedValue.id) {
      return;
    }
    onChange(value);
  };

  return (
    <Wrapper style={styles}>
      {values.map((it, index) => (
        <ToogleButton styles={buttonStyles} key={`tooglebutton${index}`} value={it} onClick={onToogleChange} isSelected={selectedValue && it.id === selectedValue.id} />
      ))}
    </Wrapper>
  );
};

export default React.memo(Toogle);
