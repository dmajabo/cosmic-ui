import React from 'react';
import { FilterOpperatorsList } from 'app/containers/Pages/SessionsPage/SessionPage/models';
import Dropdown from '../Dropdown';
import { ISelectedListItem } from 'lib/models/general';

interface Props {
  item: string;
  index: number;
  onChangeOperator: (_item: string, index: number) => void;
}

const OperatorTag: React.FC<Props> = ({ item, index, onChangeOperator }) => {
  const onUpdate = (listItem: ISelectedListItem<string>) => {
    if (listItem.value === item) return;
    onChangeOperator(listItem.value, index);
  };

  return (
    <Dropdown
      selectedValue={item}
      values={FilterOpperatorsList}
      onSelectValue={onUpdate}
      wrapStyles={{
        height: '24px',
        margin: '0 12px 12px 0',
        width: '70px',
      }}
      selectStyles={{
        borderColor: 'var(--_primaryButtonBorder)',
        padding: '2px 24px 2px 8px',
        fontSize: '12px',
      }}
    />
  );
};

export default React.memo(OperatorTag);
