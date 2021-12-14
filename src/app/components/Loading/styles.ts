import styled, { keyframes } from 'styled-components';

const opaque = keyframes`
  0% {
    opacity: 0.1;
  }
  40% {
    opacity: 1;
  }
  80% {
    opacity: 0.1;
  }
  100% {
    opacity: 0.1;
  }
`;

interface Props {
  width?: string;
  height?: string;
  margin?: string;
}
export const Wrapper = styled.div<Props>`
  margin: ${props => props.margin || '2em auto'};
  width: ${props => props.width || '40px'};
  height: ${props => props.height || '40px'};
  position: relative;
  svg {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
`;
export const Circle = styled.div`
  color: var(--_primaryBg);
  height: 10px;
  width: 10px;
  background-color: var(--_defaultIconColor);
  border-radius: 50%;
  position: absolute;
  animation: 0.8s ${opaque} ease-in-out infinite both;
  &:nth-child(1) {
    top: -25px;
    left: 0;
  }
  &:nth-child(2) {
    top: -17px;
    left: 17px;
    animation-delay: 0.1s;
  }
  &:nth-child(3) {
    top: 0;
    left: 25px;
    animation-delay: 0.2s;
  }
  &:nth-child(4) {
    top: 17px;
    left: 17px;
    animation-delay: 0.3s;
  }
  &:nth-child(5) {
    top: 25px;
    left: 0;
    animation-delay: 0.4s;
  }
  &:nth-child(6) {
    top: 17px;
    left: -17px;
    animation-delay: 0.5s;
  }
  &:nth-child(7) {
    top: 0;
    left: -25px;
    animation-delay: 0.6s;
  }
  &:nth-child(8) {
    top: -17px;
    left: -17px;
    animation-delay: 0.7s;
  }
`;

interface ILoadProps {
  position?: 'absolute' | 'fixed' | 'relative' | 'static';
  background?: string;
  width?: string;
  height?: string;
  zIndex?: number;
  top?: string;
  bottom?: string;
  opacity?: string;
  pointerEvents?: string;
}
export const AbsLoaderWrapper = styled.div<ILoadProps>`
  display: flex;
  position: ${props => props.position || 'absolute'};
  top: ${props => props.top || 0};
  bottom: ${props => props.bottom || 'unset'};
  left: 0;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  pointer-events: ${props => props.pointerEvents || 'none'};
  z-index: ${props => props.zIndex || 100};
  opacity: ${props => props.opacity || '0.5'};
`;
