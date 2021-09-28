import styled from 'styled-components';

export const ContainerWrapper = styled.g`
  transition: all 0.2s ease-in-out;
  /* Hidden init state */
  opacity: 0;
  transform: ${`translate(50px, 0) scale(0)`};
  &.enter,
  &.entered {
    /* Animate in state */
    opacity: 1;
    transform: ${`translate(0px, 0) scale(1)`};
  }
  &.exit,
  &.exited {
    /* Animate out state */
    opacity: 0;
    transform: ${`translate(50px, 0) scale(0)`};
  }
`;
