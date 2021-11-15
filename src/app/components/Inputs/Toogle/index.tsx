import { ISelectedListItem } from 'lib/models/general';
import React from 'react';
import { Wrapper } from './styles';
import ToogleButton from './ToogleButton';

interface IProps {
  selectedValue: ISelectedListItem<any> | string | null;
  values: ISelectedListItem<any>[] | string[];
  onChange: (value: ISelectedListItem<any> | string) => void;
  styles?: Object;
  buttonStyles?: Object;
  simple?: boolean;
}
const Toogle: React.FC<IProps> = ({ selectedValue, values, onChange, styles, buttonStyles, simple }) => {
  const onToogleChange = (value: ISelectedListItem<any>) => {
    if (selectedValue && typeof selectedValue !== 'string' && value.id === selectedValue.id) return;
    onChange(value);
  };

  const onSimpleToogleChange = (value: string) => {
    if (value === selectedValue) return;
    onChange(value);
  };

  if (simple) {
    return (
      <Wrapper style={styles}>
        {values.map((it, index) => (
          <ToogleButton styles={buttonStyles} key={`tooglebutton${index}`} value={it} onClick={onSimpleToogleChange} isSelected={selectedValue && it === selectedValue} />
        ))}
      </Wrapper>
    );
  }

  return (
    <Wrapper style={styles}>
      {values.map((it, index) => (
        <ToogleButton
          styles={buttonStyles}
          key={`tooglebutton${index}`}
          value={it}
          onClick={onToogleChange}
          isSelected={selectedValue && typeof selectedValue !== 'string' && it.id === selectedValue.id}
        />
      ))}
    </Wrapper>
  );
};

export default React.memo(Toogle);
