import styled from 'styled-components';

export const CounterWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

interface PRopsLabel {
  bgColor?: string;
  color?: string;
  width?: string;
  minWidth?: string;
}

export const CounteBg = styled.span<PRopsLabel>`
  display: inline-flex;
  height: 100%;
  margin: 0 auto;
  width: ${props => props.width || 'auto'};
  min-width: ${props => props.minWidth || '100%'};
  max-width: 100%;
  text-align: center;
  background: ${props => props.bgColor || 'red'};
  border-radius: 8px;
`;
export const CounteLable = styled.span<PRopsLabel>`
  display: inline-block;
  margin: auto;
  width: auto;
  max-width: 80%;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: ${props => props.color || 'var(--_primaryBg)'};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
