import styled from 'styled-components';
import { ButtonStyles } from '../styles/styles';

export const SecondaryButtonStyles = styled(ButtonStyles as any)`
  color: var(--_primaryColor);
  background: transparent;
  border-color: var(--_disabledButtonColor);
  &:hover:not(:disabled) {
    .inheritFill {
      fill: var(--_hoverButtonBg);
    }
    border-color: var(--_hoverButtonBg);
    color: var(--_hoverButtonBg);
    background-color: var(--_primaryBg);
  }
  &:disabled {
    color: var(--_disabledButtonColor);
    background: var(--_disabledButtonBg);
    cursor: default;
    .inheritFill {
      fill: var(--_disabledButtonColor);
    }
  }
`;
