import React from 'react';
import { DisplayValueStyles } from './styles';

interface IProps {
  selectedItem: string | number;
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
      return `${props.selectedItem}`;
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
