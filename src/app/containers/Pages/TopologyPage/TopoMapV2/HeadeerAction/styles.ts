import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 40px;
  height: 70px;
  width: 100%;
  background: var(--_primaryBg);
  z-index: 1;
`;

interface ISideProps {
  margin?: string;
}
export const Side = styled.div<ISideProps>`
  display: inline-flex;
  width: auto;
  flex-shrink: 0;
  max-width: 100%;
  margin: ${props => props.margin || '0'};
  flex-wrap: nowrap;
  pointer-events: all;
`;

export const ZoomValue = styled.span`
  margin: auto 0;
  flex-shrink: 0;
  width: 60px;
  display: block;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--_primaryTextColor);
  position: relative;
  input {
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    outline: 0;
    background: var(--_primaryBg);
    color: var(--_primaryBg);
  }
  span {
    /* position: absolute;
    top: 0;
    left: 0; */
    width: 100%;
    pointer-events: none;
  }
`;
