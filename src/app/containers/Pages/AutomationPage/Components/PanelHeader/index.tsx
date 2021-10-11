import React from 'react';
import { StepNumber, StepTitle, StepStaus } from './styles';

interface Props {
  index: number | string;
  state: any;
  label: string;
  selected: boolean;
  children?: React.ReactNode;
}

export const PanelHeader: React.FC<Props> = (props: Props) => {
  return (
    <>
      <StepNumber selected={props.selected} state={props.state}>
        {props.index}
      </StepNumber>
      <StepTitle>{props.label}</StepTitle>
      {props.children}
      {props.state && <StepStaus>{props.state}</StepStaus>}
    </>
  );
};

export default React.memo(PanelHeader);
