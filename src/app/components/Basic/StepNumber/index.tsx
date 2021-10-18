import React from 'react';
import { StepNumberStyles } from './styles';
import { StepperItemStateType } from 'app/components/Stepper/model';

interface Props {
  value: number | string;
  state: StepperItemStateType;
  selected?: boolean;
  highlighted?: boolean;
  styles?: Object;
}

const StepNumber: React.FC<Props> = ({ value, state, selected, highlighted, styles }) => {
  return (
    <StepNumberStyles style={styles} selected={selected} highlighted={highlighted} state={state}>
      {value}
    </StepNumberStyles>
  );
};

export default React.memo(StepNumber);
