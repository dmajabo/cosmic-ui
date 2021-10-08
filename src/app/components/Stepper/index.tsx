import React from 'react';
import { IStepperItem } from './model';
import StepperItem from './StepperItem';
import { StepperWrappper, Title } from './styles';

interface Props {
  title?: string;
  steps: IStepperItem<any>[];
  selectedStep: number;
  formatValue?: (_v: number) => string;
  onSelectStep: (index: number) => void;
}

const Stepper: React.FC<Props> = (props: Props) => {
  const onClick = (i: number) => {
    if (i === props.selectedStep) return;
    props.onSelectStep(i);
  };
  return (
    <StepperWrappper>
      {props.title && <Title>{props.title}</Title>}
      {props.steps.map((step, i) => (
        <StepperItem key={`stepItem${step.id}`} index={i} formatValue={props.formatValue} item={step} selected={step.value === props.selectedStep} onClick={onClick} />
      ))}
    </StepperWrappper>
  );
};

export default React.memo(Stepper);
