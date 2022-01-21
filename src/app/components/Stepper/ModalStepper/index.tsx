import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepperStyles } from 'app/components/Stepper/StepperMuiStyles';
import { IStepperStep } from 'lib/models/general';
import { StepButton, StepButtonIcon, StepButtonLabel } from './styles';
import { checkMark } from './checkMark';
interface Props {
  activeStep: number;
  steps: IStepperStep[];
  completed: Object;
  onChange: (step: number) => void;
}

const ModalStepper: React.FC<Props> = (props: Props) => {
  const stepperStyles = StepperStyles();

  const handleStep = (step: IStepperStep) => {
    if (props.activeStep === step.index) return;
    props.onChange(step.index);
  };

  return (
    <Stepper activeStep={props.activeStep} className={stepperStyles.root}>
      {props.steps.map((step, index) => (
        <Step key={`${step.index}${step.completedFieldName}`}>
          <StepButton
            className={`${props.activeStep === step.index ? 'activeStep' : ''} ${props.completed[step.completedFieldName] ? 'completed' : ''}`}
            disabled={index !== 0 && !props.completed[props.steps[0].completedFieldName]}
            onClick={() => handleStep(step)}
          >
            <StepButtonIcon>{!props.completed[step.completedFieldName] || props.activeStep === step.index ? <span>{step.index + 1}</span> : checkMark}</StepButtonIcon>
            <StepButtonLabel>{step.label}</StepButtonLabel>
          </StepButton>
        </Step>
      ))}
    </Stepper>
  );
};

export default React.memo(ModalStepper);
