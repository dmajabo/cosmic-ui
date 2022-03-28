import styled from 'styled-components';

interface ContainerProps {
  margin?: string;
}
export const ChartContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;
  min-height: 570px;
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
  font-family: 'DMSans', sans-serif;
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
  &.heatChartWrapperMap > div:not(.empty):not(.error):not(.loading) {
    width: 100%;
    overflow: auto;
    background: var(--_chartBg);
    border-radius: 6px;
    border: 1px solid var(--_rowBorder);
    flex-grow: 0;
    align-self: flex-start;
    max-height: 100%;
    & > div div {
      min-width: 190px;
      flex-shrink: 0 !important;
      user-select: none;
    }
    & > div:nth-child(1) {
      height: 48px;
      & > div {
        font-size: 14px;
        padding: 8px !important;
        text-align: center !important;
        background: var(--_chartBg);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border: 1px solid var(--_rowBorder);
        height: 48px;
        line-height: 32px;
        box-sizing: border-box;
        flex: 1 1 190px !important;
      }
    }
    & > div:nth-child(2) > div {
      height: 48px;
      & > div:nth-child(1) {
        display: flex;
        overflow: hidden;
        align-items: center;
        justify-content: center;
        height: 48px;
        & div {
          font-size: 14px;
          padding: 8px !important;
          text-align: center !important;
          background: var(--_chartBg);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          border: 1px solid var(--_rowBorder);
          height: 48px;
          line-height: 32px;
          box-sizing: border-box;
          position: static !important;
          width: 100% !important;
          color: var(--_primaryTextColor);
          font-weight: normal;
        }
      }
      & > div {
        flex: 1 1 190px !important;
        & div {
          padding: 8px !important;
          height: 48px;
          line-height: 32px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center !important;
          color: inherit;
          font-weight: bold;
        }
      }
    }
  }
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
