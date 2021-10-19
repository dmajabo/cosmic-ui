import React from 'react';
import { DisplayField } from './styles';
import { ISelectedListItem } from 'lib/models/general';

interface Props {
  item: ISelectedListItem<string>;
  onClick: () => void;
}
const DisplayValue: React.FC<Props> = ({ item, onClick }) => {
  if (!item) return null;
  return <DisplayField onClick={onClick}>{item.label}:</DisplayField>;
};
export default React.memo(DisplayValue);
