import React from 'react';
import { DisplayValueStyles } from './styles';
import { ISelectedListItem } from 'lib/models/general';

interface IProps {
  selectedItem: ISelectedListItem<any> | string | number;
  placeholder?: string;
}

const DisplayValue: React.FC<IProps> = (props: IProps) => {
  const [displayValue, setDisplayedValue] = React.useState<string>(null);

  React.useEffect(() => {
    const _v = getDisplayValue();
    setDisplayedValue(_v);
  }, [props.selectedItem]);
  const getDisplayValue = (): string => {
    if (props.placeholder && !props.selectedItem) return props.placeholder;
    if (props.selectedItem) {
      if (typeof props.selectedItem === 'number' || typeof props.selectedItem === 'string') {
        return `${props.selectedItem}`;
      }
      return props.selectedItem.label;
    }
    return '';
  };
  return (
    <DisplayValueStyles className={props.selectedItem ? 'filled' : ''} title={props.selectedItem ? displayValue : null}>
      {displayValue}
    </DisplayValueStyles>
  );
};

export default React.memo(DisplayValue);
