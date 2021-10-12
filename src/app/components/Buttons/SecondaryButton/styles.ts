import styled from 'styled-components';

interface BProps {
  width?: string;
  height?: string;
  bgColor?: string;
  hoverBg?: string;
  color?: string;
  hoverColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
}

export const SecondaryButtonStyles = styled.button<BProps>`
  color: ${props => props.color || 'var(--_primaryColor)'};
  background: ${props => props.bgColor || 'var(--_primaryButtonBg)'};
  font-family: 'DMSans', sans-serif;
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || '40px'};
  border: 1px solid;
  border-color: ${props => props.borderColor || 'var(--_borderColor)'};
  transition: border-color 0.2s linear, background 0.2s linear;
  border-radius: 6px;
  padding: 8px 24px;
  text-align: center;
  letter-spacing: 0.1;
  flex-shrink: 0;
  outline: 0;
  cursor: pointer;
  &:hover:not(:disabled) {
    color: ${props => props.hoverColor || 'var(--_hoverButtonBg)'};
    background: ${props => props.hoverBg || 'var(--_primaryBg)'};
    border-color: ${props => props.hoverBorderColor || 'var(--_hoverButtonBg)'};
    .inheritFill {
      fill: ${props => props.hoverColor || 'var(--_hoverButtonBg)'};
    }
  }
  &:disabled {
    color: var(--_disabledButtonColor);
    background: var(--_disabledButtonBg);
    border-color: var(--_disabledButtonBg);
    cursor: default;
    .inheritFill {
      fill: var(--_disabledButtonColor);
    }
  }
`;
