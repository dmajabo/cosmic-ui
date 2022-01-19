import styled from 'styled-components';

export const HtmlNode = styled.div`
  width: 34px;
  margin: 0 7px auto 7px;
  flex-shrink: 0;
  align-self: flex-start;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: 500;
  font-size: 8px;
  line-height: 10px;
  text-align: center;
`;

export const HtmlIconWrapper = styled.span`
  display: flex;
  background: var(--_regionExpandedBg);
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  position: relative;
  border-radius: 50%;
  margin: 0 auto 8px auto;
`;

export const SvgWrapper = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin: auto;
  svg {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
`;

export const Counter = styled.span`
  display: inline-block;
  overflow: hidden;
  position: absolute;
  top: calc(100% - 6px);
  left: calc(50% - 9px);
  background: var(--_disabledTextColor);
  min-width: 18px;
  height: 12px;
  border-radius: 20px;
  color: var(--_primaryWhiteColor);
  line-height: 12px;
  padding: 0 2px;
`;

export const HtmlLabel = styled.span`
  display: inline-block;
  white-space: normal;
  color: var(--_primaryTextColor);
  vertical-align: top;
  width: 100%;
`;
