import styled from 'styled-components';
import { getNumberStyles, StepItemWrapperProps } from 'app/components/Stepper/styles';

export const StepNumberStyles = styled.div<StepItemWrapperProps>`
  ${getNumberStyles}
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  box-shadow: 0px 20px 30px rgba(5, 20, 58, 0.05);
  border-radius: 4px;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  margin: auto;
  flex-shrink: 0;
`;
