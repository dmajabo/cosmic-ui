import styled from 'styled-components';

export const TableWrapperStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-bottom: 20px;
`;

export const TableHeaderStyles = styled.div`
  display: flex;
  margin-bottom: 8px;
  text-transform: capitalize;
  color: var(--_primaryTextColor);
  font-size: 14px;
  font-weight: 500;
`;

export const CaptionRow = styled.div`
  min-height: 40px;
  padding: 12px;
  overflow: hidden;
  font-size: 14px;
  font-weight: 500;
  font-family: DMSans;
  font-style: normal;
  border: none;
  border-bottom: 1px solid var(--_rowBorder);
  background: var(--_tableBg);
`;

export const CaptionContent = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  line-height: normal;
  &:not(:last-child) {
    margin-bottom: 4px;
  }
  .label {
    color: var(--_disabledTextColor);
    text-transform: capitalize;
    margin-right: 4px;
  }
  .highlightText {
    color: var(--_primaryTextColor);
    text-transform: none;
  }
`;
