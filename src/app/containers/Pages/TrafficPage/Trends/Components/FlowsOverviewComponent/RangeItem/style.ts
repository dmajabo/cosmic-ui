import styled from 'styled-components';

export const RangeItemWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(5, 20, 58, 0.1);
`;

interface Props {
  color?: string;
}
export const RangeItemColor = styled.span<Props>`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: auto 20px auto 0;
  flex-shrink: 0;
  border-radius: 4px;
  background: ${props => props.color || '#000'};
`;

export const FromToWrapper = styled.div`
  display: inline-flex;
  margin: auto 20px auto 0;
  width: auto;
  flex-shrink: 0;
`;

export const FromToLine = styled.span`
  display: inline-block;
  margin: auto 6px;
  width: 8px;
  background: var(--_primaryTextColor);
  height: 2px;
  opacity: 0.3;
`;

interface ColorProps {
  color: string;
}
export const LegendRangeItemsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  width: auto;
  max-width: 100%;
  margin: 12px auto 0 auto;
`;

export const LegendRangeItemStyle = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  margin: 4px 12px;
`;

export const LegendRangeColorStyle = styled.span<ColorProps>`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin: auto 12px auto 0;
  flex-shrink: 0;
  border-radius: 6px;
  background: ${props => props.color || 'transparent'};
`;
export const LegendRangeValueStyle = styled.span`
  display: inline-block;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  flex-shrink: 0;
  width: 90%;
`;
