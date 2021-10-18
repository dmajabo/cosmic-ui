import styled from 'styled-components';

interface WrapLabelProps {
  isFullWidth?: boolean;
  disabled: boolean;
}

export const WrapLabel = styled.div<WrapLabelProps>`
  display: flex;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  width: ${props => (props.isFullWidth ? '100%' : 'auto')};
`;

interface CheckboxProps {
  colorIcon?: string;
  paddingLeft?: string;
  minHeight?: string;
  alignSvg?: string;
  disabled: boolean;
}

export const Input = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: inherit;
`;

interface Props {
  width?: string;
  height?: string;
}

export const Overlay = styled.span<Props>`
  position: absolute;
  top: 0px;
  left: 0px;
  height: ${props => props.height || '20px'};
  width: ${props => props.width || '20px'};
  background-color: var(--primaryBg);
  transition: all 0.1s ease-in-out;
  border: 1px solid;
  border-color: var(--_hoverButtonBg);
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  svg {
    width: 100%;
    height: 100%;
    rect:not(.interminate) {
      fill: transparent;
    }
    rect.interminate {
      fill: var(--_hoverButtonBg);
    }
    path {
      fill: transparent;
    }
  }
`;

export const Checkbox = styled.label<CheckboxProps>`
  display: inline-flex;
  min-height: ${props => props.minHeight || '20px'};
  align-items: center;
  position: relative;
  font-weight: normal;
  padding-left: ${props => props.paddingLeft || '20px'};
  ${Input} ~ ${Overlay} {
    svg {
      vertical-align: ${props => props.alignSvg || 'top'};
    }
  }
  cursor: ${props => (props.disabled ? 'default' : 'unset')};
  ${Input}:checked:not(:disabled) ~ * {
    color: var(--_hoverButtonBg);
  }
  ${Input}:checked ~ ${Overlay} {
    border-color: transparent;
    svg {
      vertical-align: ${props => props.alignSvg || 'top'};
      rect:not(.interminate) {
        fill: var(--_hoverButtonBg);
      }
      rect.interminate {
        fill: var(--_primaryBg);
      }
      path {
        fill: var(--_primaryBg);
      }
    }
  }
`;
