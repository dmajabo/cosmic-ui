import React from 'react';
import { ActionTypes } from '../../Page/NewAutomation/model';
import { CardWrapper, Label, SelectedLabel, SelectedWrapper } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { successCheckMarkIcon } from 'app/components/SVGIcons/statusIcons';

interface Props {
  id: ActionTypes;
  label: string;
  icon: any;
  selected: boolean;
  onSelect: (id: ActionTypes) => void;
}

const ActionCardItem: React.FC<Props> = (props: Props) => {
  const onSelect = () => {
    props.onSelect(props.id);
  };
  return (
    <CardWrapper onClick={onSelect}>
      <IconWrapper styles={{ margin: 'auto 20px auto 0' }} width="46px" height="46px" icon={props.icon} />
      <Label>{props.label}</Label>
      {props.selected && (
        <SelectedWrapper>
          <IconWrapper styles={{ margin: '0 12px 0 0' }} icon={successCheckMarkIcon} />
          <SelectedLabel>Selected</SelectedLabel>
        </SelectedWrapper>
      )}
    </CardWrapper>
  );
};

export default React.memo(ActionCardItem);
