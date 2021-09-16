import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  padding: 0 30px;
`;

interface ISideProps {
  margin?: string;
}
export const Side = styled.div<ISideProps>`
  width: auto;
  flex-shrink: 0;
  max-width: 100%;
  margin: ${props => props.margin || '0'};
  flex-wrap: nowrap;
`;
