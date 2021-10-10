import React from 'react';
import { IStepperItem } from './model';
import StepperItem from './StepperItem';
import { StepperWrappper, Title } from './styles';

interface Props {
  title?: string;
  steps: IStepperItem<any>[];
  selectedStep: number | string;
  formatValue?: (_v: number) => string;
  valueFormattedField?: string;
  onSelectStep: (step: IStepperItem<any>) => void;
}

const Stepper: React.FC<Props> = (props: Props) => {
  const onClick = (step: IStepperItem<any>) => {
    if (step.id === props.selectedStep || step.index === props.selectedStep) return;
    props.onSelectStep(step);
  };
  return (
    <StepperWrappper>
      {props.title && <Title>{props.title}</Title>}
      {props.steps.map((step, i) => (
        <StepperItem
          key={`stepItem${step.id}`}
          formatValue={props.formatValue}
          valueFormattedField={props.valueFormattedField}
          item={step}
          selected={step.id === props.selectedStep || step.index === props.selectedStep}
          onClick={onClick}
        />
      ))}
    </StepperWrappper>
  );
};

export default React.memo(Stepper);
