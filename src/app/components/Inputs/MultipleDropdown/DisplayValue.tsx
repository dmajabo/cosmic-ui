import React from 'react';
import { DisplayValueStyles } from './styles';

interface IProps {
  selectedItems: any[];
  placeholder?: string;
}

const DisplayValue: React.FC<IProps> = (props: IProps) => {
  const [displayValue, setDisplayedValue] = React.useState<string>(null);

  React.useEffect(() => {
    const _v = getDisplayValue();
    setDisplayedValue(_v);
  }, [props.selectedItems]);
  const getDisplayValue = (): string => {
    if (props.placeholder && (!props.selectedItems || !props.selectedItems.length)) return props.placeholder;
    if (props.selectedItems && props.selectedItems.length) return props.selectedItems.join(', ');
    return '';
  };
  return (
    <DisplayValueStyles className={props.selectedItems && props.selectedItems.length ? 'filled' : ''} title={props.selectedItems && props.selectedItems.length ? displayValue : null}>
      {displayValue}
    </DisplayValueStyles>
  );
};

export default React.memo(DisplayValue);
