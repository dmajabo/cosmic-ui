import styled from 'styled-components';

export const ChartWrapContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  position: relative;
  .networkNode,
  .destinationNode,
  .applicationNode {
    font-size: 12px;
    font-weight: 500;
    fill: var(--_primaryColor);
    font-style: normal;
    font-family: 'DMSans';
  }
  .link {
    opacity: 0.3;
    stroke-linecap: butt;
    stroke-linejoin: bevel;
  }
  .link:hover {
    opacity: 0.6;
  }
  & > svg {
    width: 100%;
    height: 100%;
    background-color: var(--_chartBg);
  }
`;
