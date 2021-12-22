import styled from 'styled-components';

export const ContainerWrapper = styled.g`
  /* transition: all 0.2s ease-in-out; */
  /* Hidden init state */
  /* opacity: 0; */
  /* transform: ${`translate(50px, 0) scale(0)`}; */
  opacity: 1;
  transform: ${`translate(0px, 0) scale(1)`};
  /* &.enter,
  &.entered {
    opacity: 1;
    transform: ${`translate(0px, 0) scale(1)`};
  }
  &.exit,
  &.exited {
    opacity: 0;
    transform: ${`translate(50px, 0) scale(0)`};
  } */
`;
