import React from 'react';
import { AccountTypes } from '../../models';
import { Label, PopupItemWrapper } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';

interface Props {
  id: AccountTypes;
  icon: any;
  label: string;
  onClick: (type: AccountTypes) => void;
}

const AddPopupItem: React.FC<Props> = ({ id, icon, label, onClick }) => {
  const handlerClick = () => {
    onClick(id);
  };
  return (
    <PopupItemWrapper onClick={handlerClick}>
      <IconWrapper width="26px" height="26px" styles={{ margin: '0 12px 0 0' }} icon={icon} />
      <Label>{label}</Label>
    </PopupItemWrapper>
  );
};

export default React.memo(AddPopupItem);
