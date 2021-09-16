import styled from 'styled-components';

interface Props {
  width?: string;
  height?: string;
}
export const Img = styled.img<Props>`
  display: block;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
`;
