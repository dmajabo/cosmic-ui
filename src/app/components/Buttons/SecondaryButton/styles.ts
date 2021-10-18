import styled from 'styled-components';

interface BProps {
  width?: string;
  height?: string;
  withoutBorder?: boolean;
}

export const SecondaryButtonStyles = styled.button<BProps>`
  font-family: 'DMSans', sans-serif;
  color: var(--_sButtonColor);
  background: var(--_sButtonBg);
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || '40px'};
  border: 1px solid;
  border-color: ${props => (props.withoutBorder ? 'var(--_sButtonBg)' : 'var(--_sButtonBorder)')};
  transition-property: color, background, border-color;
  transition: 0.2s linear;
  border-radius: 6px;
  padding: 8px 24px;
  text-align: center;
  letter-spacing: 0.1;
  flex-shrink: 0;
  outline: 0;
  cursor: pointer;
  .inheritFill {
    transition-property: fill;
    transition: 0.2s linear;
    fill: var(--_sButtonColor);
  }
  &:disabled {
    cursor: default;
  }
  &:disabled {
    color: var(--_sDisabledButtonColor);
    background: var(--_sDisabledButtonBg);
    border-color: ${props => (props.withoutBorder ? 'var(--_sDisabledButtonBg)' : 'var(--_sDisabledButtonBorder)')};
    cursor: default;
    .inheritFill {
      fill: var(--_sDisabledButtonColor);
    }
  }
  &.active,
  &:hover:not(:disabled) {
    color: var(--_sHoverButtonColor);
    background: var(--_sHoverButtonBg);
    border-color: ${props => (props.withoutBorder ? 'var(--_sHoverButtonBg)' : 'var(--_sHoverButtonBorder)')};
    .inheritFill {
      fill: var(--_sHoverButtonColor);
    }
  }
`;

export const SecondaryButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
  flex-shrink: 0;
`;
