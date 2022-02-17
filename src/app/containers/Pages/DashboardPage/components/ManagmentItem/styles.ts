import styled from 'styled-components';

interface ChartProps {
  color?: string;
}
export const ChartItem = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% / 3 - 40px / 3);
  height: 100%;
  background: var(--_chartBg);
  border: 1px solid var(--_borderColor);
  border-radius: 6px;
  padding: 20px;
  position: relative;
`;

export const ChartTitle = styled.div`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
  color: var(--_primaryTextColor);
  flex-shrink: 0;
`;

export const ChartContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  font-family: 'DMSans';
  font-style: normal;
  text-align: center;
`;

export const ChartValue = styled.div<ChartProps>`
  font-weight: bold;
  font-size: 78px;
  line-height: 78px;
  color: ${props => props.color || 'var(--_primaryTextColor)'};
  margin: 0 auto 8px auto;
  max-width: 100%;
`;

export const ChartValueLabel = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: var(--_disabledTextColor);
`;
