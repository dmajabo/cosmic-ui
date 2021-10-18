import styled from 'styled-components';

interface Props {
  margin?: string;
}
const OverflowContainer = styled.div<Props>`
  overflow-y: auto;
  overflow-x: hidden;
  width: calc(100% + 20px);
  max-height: 100%;
  padding: 0 20px 0 0;
  margin: ${props => props.margin || 'unset'};
`;

export default OverflowContainer;
