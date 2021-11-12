import styled from 'styled-components';

export const SliderWrapper = styled.div`
  min-height: 40px;
  flex-shrink: 0;
  .slider-mark {
    text-align: center;
    margin-left: -50%;
  }
  .text-left {
    text-align: left;
    margin-left: 0;
  }
  .text-right {
    text-align: right;
    margin-left: -100%;
  }
`;
