import styled from 'styled-components';

export const ChartHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 25px;
`;
export const ChartHeaderText = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  color: var(--_titleColor);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
export const LegendContainer = styled.div`
  display: flex;
`;
