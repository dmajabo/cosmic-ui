import styled from 'styled-components';

export const Wrapper = styled.div`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  display: inline-flex;
  cursor: pointer;
  width: auto;
  min-height: 24px;
  align-items: center;
  flex-grow: 0;
  position: relative;
`;

export const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
  top: 0;
  height: 0;
  &:checked + span {
    color: var(--_primaryColor);
  }
`;

interface CircleProps {
  width?: string;
  height?: string;
  labelAfter?: boolean;
  checked: boolean;
}
export const RadioStyles = styled.span<CircleProps>`
  display: inline-block;
  width: ${props => props.width || '16px'};
  height: ${props => props.height || '16px'};
  margin: ${props => (props.labelAfter ? 'auto 8px auto 0' : 'auto 0')};
  opacity: ${props => (props.checked ? 1 : 0.4)};
  box-shadow: ${props => (props.checked ? '0px 4px 7px rgba(67, 127, 236, 0.15)' : 'none')};
  border: 3px solid;
  border-color: ${props => (props.checked ? 'var(--_highlightColor)' : 'var(--_disabledTextColor)')};
  border-radius: 50%;
  background-color: ${props => (props.checked ? 'var(--_primaryBg)' : 'var(--_disabledTextColor)')};
`;

export const Label = styled.span`
  color: var(--_disabledTextColor);
  display: inline-block;
  line-height: inherit;
`;
