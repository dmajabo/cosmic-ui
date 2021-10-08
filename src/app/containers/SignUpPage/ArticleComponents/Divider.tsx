import React from 'react';
import { SignUpStyles } from '../SignUpStyles';

interface DividerProps {
  readonly text: string;
}

export const Divider: React.FC<DividerProps> = ({ text }) => {
  const classes = SignUpStyles();
  return (
    <div className={classes.startFlexContainer}>
      <div className={classes.dividerLine} />
      <div className={classes.dividerText}>{text}</div>
      <div className={classes.dividerLine} />
    </div>
  );
};
