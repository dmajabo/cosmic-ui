import styled from 'styled-components';
interface Props {
  disabled?: boolean;
}
export const InputLabel = styled.label<Props>`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: ${props => (props.disabled ? 'var(--_disabledTextColor)' : 'var(--_defaultInputColor)')};
  width: auto;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: block;
  opacity: ${props => (props.disabled ? '0.5' : '1')};
  margin-bottom: 6px;
`;
