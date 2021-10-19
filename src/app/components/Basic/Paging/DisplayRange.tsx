import React from 'react';
import { DisplayRangeStyles } from './styles';

interface Props {
  count: number;
  pageSize: number;
  currentPage: number;
}

const DisplayRange: React.FC<Props> = (props: Props) => {
  const [valueString, setValueString] = React.useState(null);

  React.useEffect(() => {
    const total = props.count > 9999 ? `${props.count}+` : props.count;
    const from = Math.max(1, (props.currentPage - 1) * props.pageSize);
    const to = Math.max(1, props.currentPage) * props.pageSize;
    const _str = `${from} - ${to} out of ${total} items`;
    setValueString(_str);
  }, [props.count, props.pageSize, props.currentPage]);

  return <DisplayRangeStyles>{valueString}</DisplayRangeStyles>;
};

export default React.memo(DisplayRange);
