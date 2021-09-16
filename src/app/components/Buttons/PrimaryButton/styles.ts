import styled from 'styled-components';
import { ButtonStyles } from '../styles/styles';

export const PrimaryButtonStyles = styled(ButtonStyles as any)`
  color: var(--_primaryColor);
  background: var(--_primaryButtonBg);
  &:disabled {
    color: var(--_disabledButtonColor);
    background: var(--_disabledButtonBg);
    cursor: default;
    .inheritFill {
      fill: var(--_disabledButtonColor);
    }
  }
  &:hover:not(:disabled) {
    color: var(--_hoverButtonColor);
    background: var(--_hoverButtonBg);
    .inheritFill {
      fill: var(--_hoverButtonColor);
    }
  }
`;
