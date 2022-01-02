import styled from 'styled-components';

export const SliderWrapper = styled.div`
  min-height: 40px;
  flex-shrink: 0;
  .slider-mark {
    text-align: center;
    margin-left: -50%;
    color: var(--_disabledTextColor);
    font-size: 11px;
    font-style: normal;
    font-family: 'DMSans';
    font-weight: normal;
    line-height: normal;
    letter-spacing: normal;
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
