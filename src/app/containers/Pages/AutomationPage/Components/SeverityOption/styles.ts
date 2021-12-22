import styled from 'styled-components';

export const OptionWrap = styled.span`
  display: inline-flex;
  width: 100%;
  height: 100%;
  align-items: center;
  margin: auto;
`;
interface CircleProps {
  color?: string;
}
export const OptionCircle = styled.span<CircleProps>`
  display: inline-block;
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: auto 12px auto 0;
  background: ${props => props.color || 'var(--_disabledTextColor)'};
`;
export const OptionLabel = styled.span`
  display: inline-block;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  color: var(--_primaryColor);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
