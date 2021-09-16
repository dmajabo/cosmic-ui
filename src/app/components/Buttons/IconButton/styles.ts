import styled from 'styled-components';
import { defaultTransition } from 'styles/global-styles';

export const Button = styled.button`
  width: 40px;
  height: 40px;
  outline: 0;
  padding: 0;
  background: var(--_primaryButtonBg);
  border: 1px solid;
  border-color: var(--_primaryButtonBorder);
  border-radius: 6px;
  cursor: pointer;
  transition: ${defaultTransition};
  &:hover:not(:disabled) {
    background: var(--_hoverButtonBg);
    border-color: var(--_hoverButtonBg);
    .inheritFill {
      fill: var(--_hoverButtonColor);
    }
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: var(--_disabledButtonBg);
  }
`;
