import styled from 'styled-components';
interface SeverityLabelContainerProps {
  readonly color: string;
}

export const SeverityLabelContainer = styled.div<SeverityLabelContainerProps>`
  background-color: ${props => props.color};
  border-radius: 50%;
  margin-right: 20px;
  display: inline-flex;
  max-width: 29px;
  width: 29px;
  height: 29px;
  max-height: 29px;
  justify-content: center;
  align-items: center;
`;

export const ArrowContainer = styled.div`
  width: 29px;
  height: 29px;
  justify-content: center;
  margin: auto;
  padding-left: 5px;
  padding-right: 45px;
  align-items: center;
`;
