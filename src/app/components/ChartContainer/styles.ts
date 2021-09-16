import styled from 'styled-components';

export const ChartContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 390px;
  height: 100%;
  max-height: 390px;
  padding: 20px;
  position: relative;
  background: var(--_chartBg);
  border: 1px solid;
  border-color: var(--_borderColor);
  box-sizing: border-box;
  border-radius: 6px;
`;

export const ChartTitle = styled.div`
  width: 100%;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  color: var(--_titleColor);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 10px;
  flex-shrink: 0;
`;

export const ChartActionBlock = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 20px;
  flex-shrink: 0;
`;

interface LabelProps {
  color?: string;
  margin?: string;
}
export const ChartActionLabel = styled.span<LabelProps>`
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: ${props => props.color || 'var(--_defaultColor)'};
  margin: ${props => props.margin || 0};
  flex-shrink: 0;
`;

export const Chart = styled.div`
  width: 100%;
  height: auto;
  max-height: 100%;
  flex-grow: 1;
  .highcharts-background {
    fill: transparent;
  }
`;
