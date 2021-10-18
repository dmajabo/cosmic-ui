import styled from 'styled-components';

export const GridHeaderWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin: 0 0 20px 0;
  align-items: center;
  font-family: 'DMSans';
  font-style: normal;
  z-index: 1;
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
  color: var(--_primaryColor);
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
  color: var(--_primaryButtonBg);
`;

export const PopupTitle = styled.div`
  direction: ltr;
  flex-shrink: 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  height: 22px;
  color: var(--_primaryColor);
  margin-bottom: 12px;
`;

export const OverflowContainer = styled.div`
  direction: ltr;
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100% - 34px);
  width: calc(100% + 20px);
  position: relative;
  left: 20px;
  padding-right: 20px;
`;

export const FilteredColumnItem = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  height: 36px;
  padding: 8px 12px;
  direction: ltr;
  background: var(--_chartBg);
  border: 1px solid var(--_rowBorder);
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
  max-width: 100%;
`;

export const FilteredColumnLabel = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: var(--_primaryColor);
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  max-width: calc(100% - 32px);
  text-overflow: ellipsis;
`;
