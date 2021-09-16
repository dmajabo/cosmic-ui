import { ICoord } from 'lib/models/general';
import styled from 'styled-components';

interface Props extends ICoord {}
export const Wrapper = styled.div<Props>`
  position: fixed;
  top: ${props => `${props.y}px` || 0};
  left: ${props => `${props.x}px` || 0};
  z-index: 1001;
  pointer-events: none;
`;
