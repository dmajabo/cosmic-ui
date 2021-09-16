import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

interface Props {
  children: React.ReactElement;
  value: number;
}
function ValueLabelComponent(props: Props) {
  const { children, value } = props;
  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

export default React.memo(ValueLabelComponent);
