import styled from 'styled-components';
import { getNumberStyles, StepItemWrapperProps } from 'app/components/Stepper/styles';

export const StepNumber = styled.div<StepItemWrapperProps>`
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
  margin: 0 20px 0 0;
  flex-shrink: 0;
`;

export const StepTitle = styled.div`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  color: var(--_primaryColor);
  flex-shrink: 0;
  margin: auto 12px auto 0;
  width: 30%;
  max-width: 300px;
  min-width: 180px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const StepStaus = styled.div`
  display: inline-block;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 23px;
  padding-left: 12px;
  margin: 0 30px 0 auto;
  color: var(--_successColor);
  flex-shrink: 0;
  text-transform: capitalize;
`;
