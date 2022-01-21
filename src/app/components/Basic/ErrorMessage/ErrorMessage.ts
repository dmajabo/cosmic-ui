import styled from 'styled-components';

interface ErrorMesProps {
  fontSize?: number;
  margin?: string;
  color?: string;
  textAlign?: string;
  padding?: string;
}
export const ErrorMessage = styled.div<ErrorMesProps>`
  font-style: normal;
  font-weight: normal;
  font-size: ${props => (props.fontSize ? props.fontSize + 'px' : '14px')};
  line-height: ${props => (props.fontSize ? props.fontSize + 4 + 'px' : '18px')};
  color: ${props => props.color || 'var(--_errorColor)'};
  margin: ${props => props.margin || '12px 0'};
  padding: ${props => props.padding || '0'};
  text-align: ${props => props.textAlign || 'center'};
`;
