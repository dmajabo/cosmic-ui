import styled, { keyframes } from 'styled-components';

const show = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  width: auto;
  min-width: 200px;
  max-width: 300px;
  height: auto;
  min-height: 100px;
  max-height: 300px;
  border-radius: 6px;
  background: var(--_primaryBg);
  color: var(--_primaryTextColor);
  position: relative;
  margin: -50px 0 0 24px;
  transform: scale(0);
  transform-origin: 0 50%;
  animation: ${show} 1s ease-in-out 0.5s;
  animation-fill-mode: forwards;
`;

export const DataField = styled.div`
  margin: 0 0 4px 0;
  font-size: 12px;
  flex-shrink: 0;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
