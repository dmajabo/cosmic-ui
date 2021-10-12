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
export const PrimaryButtonStyles = styled.button<BProps>`
  color: ${props => props.color || 'var(--_primaryColor)'};
  background: ${props => props.bgColor || 'var(--_primaryButtonBg)'};
  font-family: 'DMSans', sans-serif;
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || '40px'};
  border: 1px solid;
  border-color: ${props => props.borderColor || 'transparent'};
  transition: color, border-color, background 0.2s linear;
  border-radius: 6px;
  padding: 8px 24px;
  text-align: center;
  letter-spacing: 0.1;
  flex-shrink: 0;
  outline: 0;
  cursor: pointer;
  .inheritFill {
    fill: ${props => props.color || 'var(--_primaryColor)'};
  }
  &:disabled {
    cursor: default;
  }
  &:disabled {
    color: var(--_disabledButtonColor);
    background: var(--_disabledButtonBg);
    border-color: var(--_disabledButtonBg);
    cursor: default;
    * {
      cursor: default !important;
    }
    .inheritFill {
      fill: var(--_disabledButtonColor);
    }
  }
  &:hover:not(:disabled) {
    color: ${props => props.hoverColor || 'var(--_hoverButtonColor)'};
    background: ${props => props.hoverBg || 'var(--_hoverButtonBg)'};
    border-color: ${props => props.hoverBorderColor || 'transparent'};
    .inheritFill {
      fill: ${props => props.hoverColor || 'var(--_hoverButtonColor)'};
    }
  }
`;

interface Props {
  open?: boolean;
}
export const ButtonWrapper = styled.div<Props>`
  display: inline-block;
  position: relative;
  z-index: ${props => (props.open ? 10 : 1)};
`;

export const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 6px;
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  background: var(--_primaryButtonBg);
  padding: 8px 0;
  box-shadow: 0px 10px 30px rgba(5, 20, 58, 0.1);
`;
