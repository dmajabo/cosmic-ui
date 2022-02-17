import styled, { css } from 'styled-components';

export const ChartLegendWrapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 6px;
`;

interface LegendProps {
  color?: string;
  hide?: boolean;
}
export const LegendItem = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  margin: 10px;
  min-width: 76px;
  max-width: 120px;
  overflow: hidden;
  align-items: center;
  cursor: pointer;
  direction: ltr;
`;

export const LegendColor = styled.span<LegendProps>`
  width: 16px;
  height: 16px;
  border-radius: 6px;
  background: ${props => props.color || 'transparent'};
  margin: auto 12px auto 0;
  flex-shrink: 0;
  opacity: ${props => (props.hide ? 0.3 : 1)};
`;
export const LegendLabel = styled.span<LegendProps>`
  display: inline-block;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: ${props => (props.hide ? 'var(--_disabledTextColor)' : 'var(--_primaryTextColor)')};
  width: auto;
  min-width: 26px;
  max-width: calc(100% - 36px);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const LegendWrapper = css`
  position: absolute;
  top: 50%;
  width: 25%;
  height: auto;
  max-height: 95%;
  display: flex;
  flex-direction: column;
  transform: translateY(-50%);
  flex-wrap: wrap;
  overflow: hidden;
  align-items: flex-start;
  overflow-x: auto;
`;
export const LegendRight = styled.div`
  ${LegendWrapper}
  right: 0;
`;

export const LegendLeft = styled.div`
  ${LegendWrapper}
  left: 0;
  direction: rtl;
  ${LegendItem} {
    justify-content: flex-end;
  }
`;

export const LegendBottom = styled.div<WrapProps>`
  position: absolute;
  bottom: -9px; // legendItem line height / 2
  width: 100%;
  height: auto;
  max-height: ${props => (props.height ? `${100 - props.height}%` : '20%')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
  overflow-y: auto;
  ${LegendItem} {
    margin: 4px;
    width: auto;
  }
`;

interface WrapProps {
  width?: number;
  height?: number;
}
export const ChartWrapContainer = styled.div<WrapProps>`
  display: flex;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  position: relative;
  border-radius: 6px;
  .networkNode,
  .destinationNode,
  .applicationNode {
    font-size: 12px;
    font-weight: 500;
    fill: var(--_primaryTextColor);
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
    border-radius: 6px;
    &.donutChart {
      width: ${props => (props.width ? props.width + '%' : '50%')};
      height: ${props => (props.height ? props.height + '%' : '100%')};
      margin: 0 auto;
      overflow: visible;
    }
  }
`;

interface TextProps {
  fSize: number;
  color?: string;
  weight?: string | number;
}
export const TextStyle = styled.text<TextProps>`
  font-size: ${props => (props.fSize ? props.fSize / 16 + 'vw' : '14px')};
  font-family: 'DMSans';
  font-weight: ${props => props.weight || 500};
  fill: ${props => props.color || 'var(--_primaryTextColor)'};
  text-anchor: middle;
`;
