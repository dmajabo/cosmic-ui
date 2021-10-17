import React from 'react';
import { SignUpStyles } from '../SignUpStyles';

interface SubStepProps {
  readonly subStepCount: number;
  readonly descImg?: string;
}

export const SubStepComponent: React.FC<SubStepProps> = ({ subStepCount, descImg, children }) => {
  const classes = SignUpStyles();
  return (
    <div className={classes.connectFlexContainer}>
      <div className={classes.subStepCountBox}>{subStepCount}</div>
      <div>
        <div className={classes.subStepTitle}>{children}</div>
        {descImg ? <img src={descImg} alt="description image" /> : <></>}
      </div>
    </div>
  );
};
