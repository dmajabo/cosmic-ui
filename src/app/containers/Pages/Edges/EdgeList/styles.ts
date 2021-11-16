import styled from 'styled-components';

export const EdgeListItemsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;

export const EdgeListItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: calc(100% / 3 - 60px / 3);
  height: 305px;
  background: var(--_primaryBg);
  border-radius: 6px;
  margin: 0 30px 30px 0;
  position: relative;
  font-family: 'DMSans';
  &:nth-child(3n) {
    margin-right: 0;
  }
`;

export const EdgeNameWrapper = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 34px;
  color: var(--_primaryColor);
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 30px;
  flex-shrink: 0;
`;

export const EdgeContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 80px);
  padding: 30px;
  overflow: hidden;
`;

interface RowProps {
  margin?: string;
  padding?: string;
  justify?: string;
  wrap?: string;
}
export const DataItemsRow = styled.div<RowProps>`
  display: flex;
  justify-content: ${props => props.justify || 'space-between'};
  align-items: center;
  flex-shrink: 0;
  flex-wrap: ${props => props.wrap || 'nowrap'};
  max-height: 72px;
  overflow: hidden;
  position: relative;
  margin: ${props => props.margin || '0'};
  padding: ${props => props.padding || '0'};
`;

export const EdgeFooter = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-top: auto;
  padding: 30px;
  height: 80px;
  border-top: 1px solid var(--_rowBorder);
  justify-content: space-between;
`;

interface ItemProps {
  margin?: string;
}
export const ValueItem = styled.div<ItemProps>`
  display: inline-flex;
  align-items: center;
  margin: ${props => props.margin || 0};
`;

interface SpanProps {
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  color?: string;
  margin?: string;
}
export const ItemLabel = styled.span<SpanProps>`
  font-style: normal;
  font-weight: ${props => props.fontWeight || '500'};
  font-size: ${props => props.fontSize || '16px'};
  line-height: ${props => props.fontSize || '21px'};
  color: ${props => props.color || 'var(--_primaryColor)'};
  margin: ${props => props.margin || '0 12px 0 0'};
`;

export const ItemValue = styled.span<SpanProps>`
  font-style: normal;
  font-weight: ${props => props.fontSize || 'normal'};
  font-size: ${props => props.fontWeight || '16px'};
  line-height: ${props => props.fontSize || '21px'};
  color: ${props => props.color || 'var(--_primaryColor)'};
`;

export const StatusCircle = styled.span`
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color || 'var(--_successColor)'};
  margin-right: 12px;
`;
