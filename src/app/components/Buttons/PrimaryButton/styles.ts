import styled from 'styled-components';

interface BProps {
  width?: string;
  height?: string;
}

export const PrimaryButtonStyles = styled.button<BProps>`
  color: var(--_pButtonColor);
  background: var(--_pButtonBg);
  font-family: 'DMSans', sans-serif;
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || '40px'};
  border: 1px solid;
  border-color: var(--_pButtonBorder);
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
    fill: var(--_pButtonColor);
  }
  &:disabled {
    cursor: default;
  }
  &:disabled {
    color: var(--_pDisabledButtonColor);
    background: var(--_pDisabledButtonBg);
    border-color: var(--_pDisabledButtonBorder);
    cursor: default;
    * {
      cursor: default !important;
    }
    .inheritFill {
      fill: var(--_pDisabledButtonColor);
    }
  }
  &:hover:not(:disabled) {
    color: var(--_pHoverButtonColor);
    background: var(--_pHoverButtonBg);
    border-color: var(--_pHoverButtonBorder);
    .inheritFill {
      fill: var(--_pHoverButtonColor);
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
  background: var(--_primaryBg);
  padding: 8px 0;
  box-shadow: 0px 10px 30px rgba(5, 20, 58, 0.1);
`;
