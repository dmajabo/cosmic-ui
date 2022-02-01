import styled from 'styled-components';

interface BProps {
  width?: string;
  height?: string;
  withoutBorder?: boolean;
}

export const SecondaryButtonStyles = styled.button<BProps>`
  font-family: 'DMSans', sans-serif;
  color: var(--_sButtonColor);
  background: var(--_primaryWhiteColor);
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || '50px'};
  border: 1px solid;
  border-color: ${props => (props.withoutBorder ? 'var(--_primaryWhiteColor)' : 'var(--_sButtonBorder)')};
  transition-property: color, background, border-color;
  transition: 0.2s linear;
  border-radius: 6px;
  padding: 8px 24px;
  text-align: center;
  letter-spacing: 0.1;
  flex-shrink: 0;
  outline: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  .inheritFill {
    transition-property: fill;
    transition: 0.2s linear;
    fill: var(--_sIconColor);
  }
  &:disabled {
    cursor: default;
  }
  &:disabled {
    color: var(--_sDisabledButtonColor);
    background: var(--_primaryWhiteColor);
    border-color: ${props => (props.withoutBorder ? 'var(--_primaryWhiteColor)' : 'var(--_sDisabledButtonBorder)')};
    cursor: default;
    .inheritFill {
      fill: var(--_sDisabledButtonColor);
    }
  }
  &.active,
  &:hover:not(:disabled) {
    color: var(--_sHoverButtonColor);
    background: var(--_primaryWhiteColor);
    border-color: ${props => (props.withoutBorder ? 'var(--_primaryWhiteColor)' : 'var(--_sHoverButtonBorder)')};
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
