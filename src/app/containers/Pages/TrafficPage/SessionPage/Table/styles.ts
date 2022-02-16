import styled from 'styled-components';

export const GridHeaderWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin: 0 0 20px 0;
  align-items: center;
  font-family: 'DMSans';
  font-style: normal;
`;

export const GridLabelWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  width: auto;
  margin-right: auto;
  padding-right: 12px;
`;
export const GridLabel = styled.span`
  display: inline-block;
  font-weight: 700;
  font-size: 22px;
  line-height: 29px;
  color: var(--_primaryTextColor);
  margin-right: 16px;
`;

export const GridCount = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background: var(--_hoverButtonBg);
  border-radius: 20px;
  height: 22px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  min-width: 30px;
  text-align: center;
  color: var(--_primaryWhiteColor);
`;
