import React from 'react';
import StepNumber from 'app/components/Basic/StepNumber';
import { StepStaus, StepTitle } from 'app/containers/Pages/AutomationPage/Components/PanelHeader/styles';
import { IEdgeStepValidation } from '../model';
import { StepperItemStateType } from 'app/components/Stepper/model';
import WarningInfo from './WarningInfo';

interface Props {
  index: number | string;
  validationObject: IEdgeStepValidation;
  label: string;
  selected: boolean;
  children?: React.ReactNode;
  stepNumberWidth?: string;
  stepNumberHeight?: string;
}

export const PanelHeader: React.FC<Props> = (props: Props) => {
  return (
    <>
      <StepNumber
        styles={{ width: props.stepNumberWidth || '50px', height: props.stepNumberHeight || '50px', lineHeight: props.stepNumberHeight || '50px', margin: '0 30px 0 0' }}
        value={props.index}
        selected={props.selected}
        state={props.validationObject && props.validationObject.state ? props.validationObject.state : null}
      />
      <StepTitle>{props.label}</StepTitle>
      {props.children}
      {props.validationObject && props.validationObject.state && props.validationObject && props.validationObject.state === StepperItemStateType.COMPLETE ? (
        <StepStaus>{props.validationObject.state}</StepStaus>
      ) : null}
      {props.validationObject && props.validationObject.state && props.validationObject && props.validationObject.state === StepperItemStateType.WARNING ? (
        <WarningInfo stepNumber={props.index} errors={props.validationObject.errors} />
      ) : null}
    </>
  );
};

export default React.memo(PanelHeader);
