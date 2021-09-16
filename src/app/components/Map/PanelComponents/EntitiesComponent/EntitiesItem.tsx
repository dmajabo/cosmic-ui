import React from 'react';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { EntityItemWrapper, EntityItemLabel } from './style';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { IEntity } from 'lib/models/entites';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';

interface IProps {
  item: IEntity;
}

const EntitiesItem: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();

  const onCheckedChange = () => {
    topology?.onSelectEntity(props.item, !props.item.selected);
  };

  return (
    <EntityItemWrapper disabled={props.item.disabled} className={props.item.selected ? 'active' : ''} onClick={onCheckedChange}>
      <SimpleCheckbox isChecked={props.item.selected || false} isDisabled={props.item.disabled} />
      <IconWrapper isIconasStrign styles={{ width: '18px', height: '18px', margin: 'auto 12px auto 20px' }} icon={props.item.icon} />
      <EntityItemLabel>{props.item.label}</EntityItemLabel>
    </EntityItemWrapper>
  );
};

export default React.memo(EntitiesItem);
