import styled from 'styled-components';
import { Button } from 'app/components/Buttons/IconButton/styles';

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
