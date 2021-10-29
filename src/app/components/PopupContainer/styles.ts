import styled from 'styled-components';

interface Props {
  width?: string;
  height?: string;
}
export const Wrapper = styled.div<Props>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'auto'};
  background: var(--_primaryBg);
  box-shadow: 0px 15px 50px rgba(132, 141, 163, 0.15);
  border-radius: 6px;
  z-index: 1;
`;

export const PopupLinkItem = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: var(--_primaryColor);
  padding: 12px 24px;
  cursor: pointer;
  &:hover {
    background: var(--_appBg);
  }
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
