import React from 'react';
import { Tooltip } from '@mui/material';
import { withStyles } from '@mui/styles';

const TooltipStyles = withStyles({
  tooltip: {
    '&.MuiTooltip-tooltip': {
      color: 'var(--_primaryTextColor)',
      fontSize: 12,
      fontFamily: 'DMSans',
      borderRadius: 6,
      backgroundColor: 'var(--_primaryBg)',
      boxShadow: '0px 4px 15px rgba(5, 20, 58, 0.15)',
    },
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
