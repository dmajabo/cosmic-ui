import styled from 'styled-components';

interface Props {
  width?: string;
  height?: string;
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
}
export const TextButtonStyles = styled.button<Props>`
  width: ${props => props.width || '200px'};
  height: ${props => props.height || '60px'};
  border: none;
  border-radius: 6px;
  background: ${props => props.bgColor || 'var(--_primaryButtonBg)'};
  color: ${props => props.textColor || 'var(--_primaryColor)'};
  outline: none;
  padding: 0;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
