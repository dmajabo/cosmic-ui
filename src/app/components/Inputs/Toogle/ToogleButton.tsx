import IconWrapper from 'app/components/Buttons/IconWrapper';
import { ISelectedListItem } from 'lib/models/general';
import React from 'react';
import { ToggleButtonWrapper } from './styles';

interface IProps {
  value: ISelectedListItem<string>;
  isSelected: boolean;
  onClick: (value: ISelectedListItem<string>) => void;
  styles?: Object;
}
const ToogleButton: React.FC<IProps> = ({ value, isSelected, styles, onClick }) => {
  const handlerClick = () => {
    onClick(value);
  };
  return (
    <ToggleButtonWrapper className={isSelected ? 'toogleselected' : ''} style={styles} isSelected={isSelected} onClick={handlerClick}>
      {value.icon && <IconWrapper styles={{ height: '14px', width: '16px', margin: '0 10px 0 0' }} icon={value.icon} />}
      {value.label}
    </ToggleButtonWrapper>
  );
};

export default React.memo(ToogleButton);
