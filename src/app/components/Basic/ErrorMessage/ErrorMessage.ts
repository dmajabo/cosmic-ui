import styled from 'styled-components';

interface ErrorMesProps {
  fontSize?: number;
  margin?: string;
}
export const ErrorMessage = styled.div<ErrorMesProps>`
  font-style: normal;
  font-weight: normal;
  font-size: ${props => props.fontSize + 'px' || '14px'};
  line-height: ${props => props.fontSize + 4 + 'px' || '18px'};
  color: var(--_errorColor);
  margin: ${props => props.margin || '12px 0'};
`;
