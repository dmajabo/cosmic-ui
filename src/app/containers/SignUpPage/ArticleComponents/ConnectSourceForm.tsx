import React from 'react';
import { SignUpStyles } from '../SignUpStyles';
import { StepData } from '..';
import { Button } from '@material-ui/core';
import SkipIcon from '../icons/skip.svg';

interface ConnectFormProps {
  readonly title: string;
  readonly img: string;
  readonly subtitle: string;
  readonly steps: StepData[];
}

export const ConnectSourceForm: React.FC<ConnectFormProps> = ({ title, img, subtitle, steps }) => {
  const classes = SignUpStyles();
  return (
    <div className={classes.connectFormContainer}>
      <div className={classes.titleContainer}>
        <img className={classes.titleImg} src={img} alt="aws-icon" />
        <span className={classes.title}>{title}</span>
      </div>
      <div className={classes.subTitle}>{subtitle}</div>
      {steps.map((step, index) => (
        <div key={index} className={classes.grayBorderBox}>
          <div className={classes.connectFlexContainer}>
            <div className={classes.stepCountBox}>{index + 1}</div>
            <div>
              <div className={classes.stepTitle}>{step.stepTitle}</div>
              <div>{step.stepContent}</div>
            </div>
          </div>
        </div>
      ))}
      <div className={classes.flexContainer}>
        <div>
          <div className={classes.skipSetupButton}>
            SKIP SETUP
            <img className={classes.whiteArrow} src={SkipIcon} alt="skip setup" />
          </div>
          <div className={classes.skipSetupText}>You can finish it in any time.</div>
        </div>
        <>
          <Button className={classes.startButton} color="primary" disabled={true} variant="contained" disableElevation>
            CONNECT
          </Button>
        </>
      </div>
    </div>
  );
};
