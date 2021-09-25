import styled from 'styled-components';

export const TransitionGContainer = styled.g`
  opacity: 0;
  transform-origin: center center;
  transform: scale(0);
  transition: all 0.2s ease-in-out;
  &.enter,
  &.entered {
    opacity: 1;
    transform: none;
  }
  &.exit,
  &.exited {
    opacity: 0;
    transform: scale(0);
  }
`;
