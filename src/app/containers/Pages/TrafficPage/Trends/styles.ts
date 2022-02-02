import styled from 'styled-components';

interface ContainerProps {
  margin?: string;
}
export const ChartContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;
  height: 570px;
  background: var(--_primaryBg);
  border-radius: 6px;
  position: relative;
  padding: 40px;
  margin: ${props => props.margin || '0'};
`;

export const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  min-height: 30px;
  flex-shrink: 0;
`;

export const ChartLabel = styled.div`
  color: var(--_primaryTextColor);
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
  max-width: 100%;
`;

export const ChartWrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 60px);
  border: 1px solid;
  border-color: var(--_borderColor);
  border-radius: 6px;
  background: var(--_chartBg);
  position: relative;
`;

export const PanelTitle = styled.div`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
  color: var(--_primaryTextColor);
  margin-bottom: 30px;
`;
