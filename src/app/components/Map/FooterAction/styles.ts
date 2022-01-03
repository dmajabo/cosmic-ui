import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  justify-content: space-between;
  padding: 20px 30px;
  background: var(--_primaryBg);
  position: relative;
`;

export const SliderWrapper = styled.div`
  max-width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0 0 0 12px;
  display: flex;
  padding: 0 20px;
  position: relative;
  &:after,
  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    width: 50px;
    height: 30px;
    background: var(--_primaryBg);
  }
  &:after {
    right: -30px;
  }
  &:before {
    left: -30px;
  }
`;
