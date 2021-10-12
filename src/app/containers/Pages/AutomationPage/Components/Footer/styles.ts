import styled from 'styled-components';

interface Props {
  primary?: boolean;
  margin?: string;
}
export const Button = styled.button<Props>`
  height: 60px;
  min-width: 200px;
  border: 1px solid;
  border-color: ${props => (props.primary ? '#437FEC' : '#CBD2DC')};
  background: ${props => (props.primary ? '#437FEC' : '#FFFFFF')};
  border-radius: 6px;
  color: ${props => (props.primary ? '#FFFFFF' : '#05143a')};
  margin: ${props => props.margin || '0'};
  outline: 0;
  flex-shrink: 0;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  &:disabled {
    background: #cbd2dc;
    opacity: 0.5;
    border-color: #cbd2dc;
    color: #05143a;
    cursor: not-allowed;
    svg {
      cursor: not-allowed;
    }
    .inheritFill {
      fill: #05143a;
      fill-opacity: 0.5;
    }
  }
`;
