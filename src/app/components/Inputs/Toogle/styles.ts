import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  width: auto;
  height: 40px;
  background: var(--_appBg);
  padding: 2px;
  border-radius: 6px;
`;

interface IBProps {
  isSelected: boolean;
}
export const ToggleButtonWrapper = styled.button<IBProps>`
  width: auto;
  max-width: 200px;
  height: 100%;
  border: 1px solid;
  border-color: ${props => (props.isSelected ? 'var(--_primaryBg)' : 'transparent')};
  border-radius: 6px;
  background: ${props => (props.isSelected ? 'var(--_primaryBg)' : 'transparent')};
  outline: 0;
  color: ${props => (props.isSelected ? 'var(--_hoverButtonBg)' : 'var(--_defaultInputColor)')};
  text-transform: uppercase;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  .inheritFill {
    fill: currentColor;
  }
`;
