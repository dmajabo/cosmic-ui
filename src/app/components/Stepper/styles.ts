import styled, { css } from 'styled-components';
import { StepperItemStateType } from './model';

export const StepperWrappper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  font-family: 'DMSans';
  width: 100%;
`;

export const Title = styled.div`
  font-style: normal;
  font-weight: bold;
  color: var(--_primaryTextColor);
  margin-bottom: 20px;
  flex-shrink: 0;
  font-size: 22px;
  line-height: 29px;
`;

export interface StepItemWrapperProps {
  selected?: boolean;
  highlighted?: boolean;
  state: StepperItemStateType;
  disabled?: boolean;
}

export const getNumberStyles = (props: StepItemWrapperProps) => {
  if (props.selected || props.highlighted) {
    return css`
      background: var(--_selectedStepperBgColor);
      color: var(--_primaryWhiteColor);
    `;
  }
  if (props.state === StepperItemStateType.COMPLETE) {
    return css`
      background: var(--_completedStepperBgColor);
      color: var(--_primaryWhiteColor);
    `;
  }
  if (props.state === StepperItemStateType.WARNING) {
    return css`
      background: var(--_errorColor);
      color: var(--_primaryWhiteColor);
    `;
  }
  return css`
    background: var(--_defStepperBgColor);
    color: var(--_defStepperNumberTextColor);
  `;
};

const getLabelStyles = (props: StepItemWrapperProps) => {
  if (props.selected) {
    return css`
      color: var(--_selectedStepperLabelColor);
    `;
  }
  if (props.state === StepperItemStateType.COMPLETE) {
    return css`
      color: var(--_completedStepperLabelColor);
    `;
  }
  return css`
    color: var(--_defStepperLabelColor);
  `;
};

const getStateStyles = (props: StepItemWrapperProps) => {
  if (props.state === StepperItemStateType.COMPLETE) {
    return css`
      color: var(--_stepperStateCompleteColor);
    `;
  }
  return css`
    color: var(--_defStepperLabelColor);
  `;
};

export const Icon = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  margin-right: 20px;
  border-radius: 4px;
  border: none;
  z-index: 1;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  span {
    margin: auto;
  }
`;
export const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  color: inherit;
  margin: auto 0;
`;
export const State = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: inherit;
`;

export const Edge = styled.div`
  position: absolute;
  width: 0;
  height: 100%;
  top: 40px;
  left: 19px;
  border-left: 0.5px dashed;
  border-right: 0.5px dashed;
  border-left-color: var(--_stepperEdgeColor);
  border-right-color: var(--_stepperEdgeColor);
`;

export const ItemWrappper = styled.div<StepItemWrapperProps>`
  display: flex;
  border: none;
  box-sizing: border-box;
  border-radius: 6px;
  position: relative;
  padding-bottom: 40px;
  ${Icon} {
    ${getNumberStyles};
  }
  ${Label} {
    ${getLabelStyles};
  }
  ${State} {
    ${getStateStyles};
  }
`;

interface ClickAreaProps {
  disabled?: boolean;
}
export const ClickableArea = styled.div<ClickAreaProps>`
  display: flex;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow: hidden;
`;
