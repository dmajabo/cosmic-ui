import styled from 'styled-components';
import { InputLabel } from '../styles/Label';

export const ExpresionArea = styled.textarea`
  flex-shrink: 0;
  width: 100%;
  border: 1px solid;
  padding: 12px 20px;
  border-color: var(--_defaultInputBorder);
  border-radius: 6px;
  min-height: 200px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: var(--_disabledTextColor);
  font-style: normal;
  resize: none;
  outline: none;
  background-color: transparent;
  line-height: 24px;
  &:focus:not(:disabled) {
    color: var(--_primaryColor);
  }
  &:disabled {
    opacity: 0.5;
    background: var(--_disabledButtonBg);
  }
`;

export const ExpresionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  flex-shrink: 0;
  min-height: 220px;
  &.focused:not(.error) {
    ${InputLabel} {
      color: var(--_primaryColor);
    }
    ${ExpresionArea} {
      color: var(--_primaryColor);
    }
  }
  &.error {
    ${InputLabel} {
      color: var(--_errorColor);
    }
    ${ExpresionArea} {
      color: var(--_errorColor);
      border-color: var(--_errorColor);
    }
  }
`;

export const ExpresionInputsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 100%;
  align-items: center;
`;

interface LabelProps {
  margin?: string;
}
export const LabelWrapper = styled.span<LabelProps>`
  display: inline-block;
  flex-shrink: 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: var(--_disabledTextColor);
  font-style: normal;
  margin: ${props => props.margin || '0'};
`;

interface IProps {
  minWidth?: string;
  maxWidth?: string;
  grow?: string;
}
export const ExpresionInputWrapper = styled.span<IProps>`
  display: inline-block;
  position: relative;
  margin: 0 6px 6px 6px;
  width: auto;
  min-width: ${props => props.minWidth || '50px'};
  max-width: ${props => props.maxWidth || '100%'};
  background: var(--_vmBg);
  border-radius: 6px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  padding: 5px 12px;
  height: 30px;
  vertical-align: middle;
  flex-grow: ${props => props.grow || '0'};
`;

export const ExpresionInputStyles = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  outline: 0;
  height: 100%;
  width: 100%;
  background: transparent;
  color: transparent;
  color: var(--_primaryColor);
  padding: 5px 12px;
  border: none;
`;

export const FakeText = styled.span`
  color: transparent;
  letter-spacing: 0.1px;
`;

interface IPopupProps {
  y?: number;
}
export const ExpresionPopup = styled.div<IPopupProps>`
  display: inline-block;
  position: absolute;
  top: ${props => (props.y ? props.y + 'px' : 'calc(100% + 2px)')};
  left: 2px;
  width: calc(100% - 4px);
  z-index: 1;
  background: var(--_primaryBg);
  box-shadow: 0px 15px 50px rgba(132, 141, 163, 0.15);
  border-radius: 6px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 6px 0;
  max-height: 172px;
  z-index: 2;
`;

export const ExpresionPopupItem = styled.div`
  height: 40px;
  padding: 8px 20px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 23px;
  color: var(--_primaryColor);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  background: var(--_primaryBg);
  &:hover {
    color: var(--_hoverButtonBg);
    background: var(--_disabledButtonBg);
  }
`;

export const HintMessage = styled.div`
  white-space: normal;
  font-size: 12px;
  text-transform: none;
  color: var(--_primaryColor);
`;
