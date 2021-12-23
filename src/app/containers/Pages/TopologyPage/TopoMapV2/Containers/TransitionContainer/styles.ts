import styled from 'styled-components';

interface Props {
  transformStyle?: string;
  origin?: string;
}
export const TransitionGContainer = styled.g<Props>`
  opacity: 0;
  transform-origin: ${props => props.origin || 'center center'};
  transform: ${props => props.transformStyle || 'scale(0)'};
  transition: all 0.2s ease-in-out;
  &.enter,
  &.entered {
    opacity: 1;
    transform: none;
  }
  &.exit,
  &.exited {
    opacity: 0;
    transform: ${props => props.transformStyle || 'scale(0)'};
  }
`;
