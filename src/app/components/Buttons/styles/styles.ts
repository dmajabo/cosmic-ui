import styled from 'styled-components';

interface BProps {
  width?: string;
}

export const ButtonStyles = styled.button<BProps>`
  font-family: 'DMSans', sans-serif;
  width: ${props => props.width || 'auto'};
  height: 40px;
  border: 1px solid;
  border-color: transparent;
  transition: color, border-color, background 0.2s linear;
  border-radius: 6px;
  padding: 8px 24px;
  text-align: center;
  letter-spacing: 0.1;
  flex-shrink: 0;
  outline: 0;
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
`;

interface LabelProps {
  margin?: string;
}
export const Label = styled.span<LabelProps>`
  color: inherit;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  margin: ${props => props.margin || 0};
`;
