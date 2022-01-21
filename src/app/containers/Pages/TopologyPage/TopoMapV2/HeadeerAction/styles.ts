import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 40px;
  height: 60px;
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
  width: 80px;
  height: 40px;
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
  padding: 10px;
  border: 1px solid var(--_borderColor);
  border-radius: 6px;
  input {
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    outline: 0;
    text-align: center;
    background: transparent;
    /* color: var(--_primaryBg); */
  }
  span {
    height: 18px;
    position: absolute;
    top: calc(50% - 9px);
    left: 0;
    width: 100%;
  }
`;
