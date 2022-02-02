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

export const PreviewColor = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  border-radius: 6px;
`;

export const Paper = styled.div`
  display: flex;
  .react-colorful {
    width: 210px;
    height: 250px;
    margin-right: 20px;
    margin-top: 3px;
  }
`;

export const SchemaTable = styled.table`
  flex-shrink: 0;
  border-collapse: separate;
  border-spacing: 3px;
`;

export const ColorItemStyles = styled.td<Props>`
  background: ${props => props.color || 'transparent'};
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
