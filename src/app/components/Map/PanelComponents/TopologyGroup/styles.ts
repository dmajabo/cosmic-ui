import { Button } from 'app/components/Buttons/IconButton/styles';
import styled from 'styled-components';

export const GroupWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 86px;
  background: var(--_interfaceBg);
  border-radius: 6px;
  margin-bottom: 10px;
  padding: 20px;
  position: relative;
`;

export const Content = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  margin: auto 0 auto 12px;
  padding: 0 24px 0 0;
  overflow: hidden;
`;

interface IField {
  primary?: boolean;
}
export const GroupField = styled.div<IField>`
  font-style: normal;
  font-weight: ${props => (props.primary ? '500' : 'normal')};
  font-size: ${props => (props.primary ? '16px' : '13px')};
  line-height: ${props => (props.primary ? '26px' : '17px')};
  color: ${props => (!props.primary ? 'var(--_disabledTextColor)' : 'var(--_primaryColor)')};
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: ${props => (props.primary ? '4px' : '0')};
`;

export const PopupItemStyles = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid;
  padding: 16px;
  cursor: pointer;
  border-bottom-color: var(--_defaultIconColor);
  &:last-child {
    border-bottom-color: transparent;
  }
`;

interface LabelProps {
  color?: string;
}
export const PopupLabel = styled.div<LabelProps>`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  text-transform: capitalize;
  color: ${props => props.color || 'var(--_defaultIconColor)'};
  max-width: 100%;
  margin: auto 0 auto 12px;
`;

interface IButtonProps {
  width?: string;
  height?: string;
  hoverIconColor?: string;
}
export const ButtonStyles = styled(Button as any)<IButtonProps>`
  width: ${props => props.width || '40px'};
  height: ${props => props.height || '40px'};
  position: absolute;
  top: calc(50% - 20px);
  right: 14px;
  background: transparent;
  border-color: transparent;
  &.active,
  &:hover:not(:disabled) {
    background: transparent;
    border-color: transparent;
    .inheritFill {
      fill: ${props => props.hoverIconColor || 'var(--_hoverButtonColor)'};
    }
  }
`;
export const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  min-width: 120px;
  max-width: 240px;
  border-radius: 6px;
`;
