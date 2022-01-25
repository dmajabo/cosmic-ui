import styled from 'styled-components';

export const LegentWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: 30px;
  overflow: hidden;
  display: flex;
  pointer-events: none;
`;

export const LegendListContainer = styled.div`
  width: auto;
  max-width: 80%;
  display: inline-flex;
  flex-wrap: wrap;
  background: var(--_primaryBg);
  margin: 0 auto;
  padding: 7.5px 15px;
  border-radius: 6px 6px 0px 0px;
  justify-content: center;
  align-items: flex-start;
`;

export const LegendItem = styled.div`
  width: auto;
  max-width: 100%;
  height: 16px;
  display: flex;
  flex-wrap: nowrap;
  margin: 7.5px 15px;
  flex-shrink: 0;
  overflow: hidden;
`;

interface SegmentColorProps {
  color?: string;
}
export const LegendItemColor = styled.span<SegmentColorProps>`
  width: 16px;
  height: 16px;
  display: inline-block;
  flex-shrink: 0;
  flex-wrap: nowrap;
  margin: 0 10px 0 0;
  border-radius: 4px;
  background: ${props => props.color || 'transparent'};
`;

export const LegendName = styled.span`
  width: auto;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 16px;
  display: inline-block;
  color: var(--_primaryTextColor);
`;
