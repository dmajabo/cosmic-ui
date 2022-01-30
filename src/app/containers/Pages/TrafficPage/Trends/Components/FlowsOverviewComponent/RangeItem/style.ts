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
