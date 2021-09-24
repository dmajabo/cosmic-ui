import styled from 'styled-components';

export const TransitionGContainer = styled.g`
  transition: all 0.2s ease-in-out;
  opacity: 0;
  transform: ${`scale(0)`};
  &.enter,
  &.entered {
    opacity: 1;
    transform: ${`scale(1)`};
  }
  &.exit,
  &.exited {
    opacity: 0;
    transform: ${`scale(0)`};
  }
`;
