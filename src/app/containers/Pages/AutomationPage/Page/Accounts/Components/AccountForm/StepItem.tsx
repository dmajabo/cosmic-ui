import React from 'react';
import { StepItemWrapper } from './styles';
// import { StepItemContent, StepItemHeader, StepItemLabel } from './styles';
// import StepNumber from 'app/components/Basic/StepNumber';
import { StepperItemStateType } from 'app/components/Stepper/model';
interface Props {
  index?: number | string;
  state?: StepperItemStateType;
  label?: string;
  children?: React.ReactNode;
  wrapStyles?: Object;
}

const StepItem: React.FC<Props> = ({ children, wrapStyles }) => {
  return (
    <StepItemWrapper style={wrapStyles}>
      {/* <StepItemHeader>
        <StepNumber value={index} state={state} highlighted styles={{ width: '40px', height: '40px', lineHeight: '40px', margin: '0 20px 0 0' }} />
        <StepItemLabel>{label}</StepItemLabel>
      </StepItemHeader>
      <StepItemContent>{children}</StepItemContent> */}
      {children}
    </StepItemWrapper>
  );
};

export default React.memo(StepItem);
