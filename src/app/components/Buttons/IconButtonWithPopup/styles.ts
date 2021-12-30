import styled from 'styled-components';
import { Button } from '../IconButton/styles';
import { Icon } from '../IconWrapper/styles';

interface IProps {
  width?: string;
  height?: string;
  hoverIconColor?: string;
}
export const ButtonStyles = styled(Button as any)<IProps>`
  width: ${props => props.width || '40px'};
  height: ${props => props.height || '40px'};
  &.hoverOnlyIcon {
    &:hover:not(:disabled) {
      background: transparent;
      border-color: transparent;
      .inheritFill {
        fill: ${props => props.hoverIconColor || 'var(--_primaryWhiteColor)'};
      }
    }
  }
  &.hoverOnlyIconAndBorder {
    &:hover:not(:disabled) {
      background: transparent;
      border-color: ${props => props.hoverIconColor || 'var(--_primaryWhiteColor)'};
      .inheritFill {
        fill: ${props => props.hoverIconColor || 'var(--_primaryWhiteColor)'};
      }
    }
  }
  &:disabled {
    ${Icon} {
      cursor: not-allowed;
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
