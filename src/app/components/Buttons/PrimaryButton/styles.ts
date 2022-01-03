import styled from 'styled-components';

interface BProps {
  width?: string;
  height?: string;
  color?: string;
  bgColor?: string;
  borderColor?: string;
  hoverColor?: string;
  hoverBg?: string;
  hoverBorder?: string;
  disabledColor?: string;
  disabledBg?: string;
  disabledBorder?: string;
}

export const PrimaryButtonStyles = styled.button<BProps>`
  color: ${props => props.color || 'var(--_primaryWhiteColor)'};
  background: ${props => props.bgColor || 'var(--_pButtonBg)'};
  font-family: 'DMSans', sans-serif;
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || '50px'};
  border: 1px solid;
  border-color: ${props => props.borderColor || 'var(--_pButtonBorder)'};
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
    fill: ${props => props.color || 'var(--_primaryWhiteColor)'};
  }
  &:disabled {
    cursor: default;
  }
  &:disabled {
    color: var(--);
    background: var(--);
    border-color: var(--);
    color: ${props => props.disabledColor || 'var(--_pDisabledButtonColor)'};
    background: ${props => props.disabledBg || 'var(--_pDisabledButtonBg)'};
    border-color: ${props => props.disabledBorder || 'var(--_pDisabledButtonBorder)'};
    cursor: default;
    * {
      cursor: default !important;
    }
    .inheritFill {
      fill: ${props => props.hoverColor || 'var(--_pDisabledButtonColor)'};
    }
  }
  &:hover:not(:disabled) {
    color: ${props => props.hoverColor || 'var(--_primaryWhiteColor)'};
    background: ${props => props.hoverBg || 'var(--_pHoverButtonBg)'};
    border-color: ${props => props.hoverBorder || 'var(--_pHoverButtonBorder)'};
    .inheritFill {
      fill: ${props => props.hoverColor || 'var(--_primaryWhiteColor)'};
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
