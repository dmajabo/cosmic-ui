import { ISelectedListItem } from 'lib/models/general';
import React from 'react';
import { ToggleButtonWrapper } from './styles';

interface IProps {
  value: ISelectedListItem<string>;
  isSelected: boolean;
  onClick: (value: ISelectedListItem<string>) => void;
}
const ToogleButton: React.FC<IProps> = (props: IProps) => {
  const onClcik = () => {
    props.onClick(props.value);
  };
  return (
    <ToggleButtonWrapper isSelected={props.isSelected} onClick={onClcik}>
      {props.value.label}
    </ToggleButtonWrapper>
  );
};

export default React.memo(ToogleButton);
