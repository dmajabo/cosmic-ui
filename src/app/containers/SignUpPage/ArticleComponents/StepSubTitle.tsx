import React from 'react';
import { SignUpStyles } from '../SignUpStyles';

interface SubStepProps {
  readonly subStepCount: number;
  readonly descImgUrl?: string;
}

export const SubStepComponent: React.FC<SubStepProps> = ({ subStepCount, descImgUrl, children }) => {
  const classes = SignUpStyles();
  return (
    <div className={classes.connectFlexContainer}>
      <div className={classes.subStepCountBox}>{subStepCount}</div>
      <div>
        <div className={classes.subStepTitle}>{children}</div>
        {descImgUrl && <img src={descImgUrl} alt="description image" />}
      </div>
    </div>
  );
};
