import styled from 'styled-components';

interface Props {
  color: string;
}
export const PreviewWrapper = styled.div`
  width: 50px;
  height: 50px;
  padding: 15px;
  border: 1px solid;
  border-color: var(--_defaultInputBorder);
  border-radius: 6px;
  display: flex;
  cursor: pointer;
`;

export const PreviewColor = styled.div<Props>`
  width: 100%;
  height: 100%;
  margin: auto;
  border-radius: 6px;
  background: ${props => props.color || 'transparent'};
`;

export const Paper = styled.div``;
