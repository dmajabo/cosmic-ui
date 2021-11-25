import React from 'react';
import { StepTitle, StepStaus } from './styles';
import StepNumber from 'app/components/Basic/StepNumber';

interface Props {
  index: number | string;
  state: any;
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
        state={props.state}
      />
      <StepTitle>{props.label}</StepTitle>
      {props.children}
      {props.state && <StepStaus>{props.state}</StepStaus>}
    </>
  );
};

export default React.memo(PanelHeader);
