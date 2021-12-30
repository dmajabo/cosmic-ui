import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const TooltipStyles = withStyles({
  tooltip: {
    color: 'var(--_primaryWhiteColor)',
    fontSize: 10,
    lineHeight: '12px',
    fontFamily: 'DMSans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    borderRadius: 20,
    backgroundColor: 'var(--_pButtonBg)',
    padding: '1px 6px',
    margin: '8px 0',
    boxShadow: 'none',
  },
})(Tooltip);

interface Props {
  children: React.ReactElement;
  value: number;
}
function ValueLabelComponent(props: Props) {
  const { children, value } = props;
  return (
    <TooltipStyles enterTouchDelay={0} placement="top" title={value}>
      {children}
    </TooltipStyles>
  );
}

export default React.memo(ValueLabelComponent);
