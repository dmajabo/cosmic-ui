import React from 'react';
import { StepItemContent, StepItemHeader, StepItemLabel, StepItemWrapper } from './styles';
import StepNumber from 'app/components/Basic/StepNumber';
import { StepperItemStateType } from 'app/components/Stepper/model';
interface Props {
  index: number | string;
  state: StepperItemStateType;
  label: string;
  children?: React.ReactNode;
  wrapStyles?: Object;
}

const StepItem: React.FC<Props> = ({ index, state, label, children, wrapStyles }) => {
  return (
    <StepItemWrapper style={wrapStyles}>
      <StepItemHeader>
        <StepNumber value={index} state={state} highlighted styles={{ width: '40px', height: '40px', lineHeight: '40px', margin: '0 20px 0 0' }} />
        <StepItemLabel>{label}</StepItemLabel>
      </StepItemHeader>
      <StepItemContent>{children}</StepItemContent>
    </StepItemWrapper>
  );
};

export default React.memo(StepItem);
