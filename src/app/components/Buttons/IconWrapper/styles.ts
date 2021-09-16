import styled from 'styled-components';

interface IProps {
  width?: string;
  height?: string;
}
export const Icon = styled.span<IProps>`
  display: inline-block;
  width: ${props => props.width || '16px'};
  height: ${props => props.height || '16px'};
  flex-shrink: 0;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
  img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
`;
