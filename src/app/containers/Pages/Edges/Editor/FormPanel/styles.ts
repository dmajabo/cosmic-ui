import styled from 'styled-components';

export const AccordionHeaderPanel = styled.div`
  display: flex;
  width: 100%;
  flex-shrink: 0;
`;

export const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-shrink: 0;
  margin: 12px 0 0 0;
`;

interface RowProps {
  margin?: string;
  wrap?: 'wrap' | 'nowrap';
}
export const PreviewRow = styled.div<RowProps>`
  display: flex;
  margin: ${props => props.margin || '0'};
  width: 100%;
  flex-shrink: 0;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  flex-wrap: ${props => props.wrap || 'nowrap'};
  align-items: flex-start;
`;

interface PreviewTextProps {
  color?: string;
  margin?: string;
}
export const PreviewText = styled.span<PreviewTextProps>`
  display: inline-block;
  margin: ${props => props.margin || '0'};
  color: ${props => props.color || 'var(--_primaryColor)'};
  max-width: 100%;
  &.label {
    flex-shrink: 0;
    max-width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const PreviewTagCount = styled.span`
  display: inline-block;
  flex-shrink: 0;
  background: var(--_selectedStepperBgColor);
  border-radius: 20px;
  padding: 2px 11px;
  color: var(--_primaryTextColor);
  font-family: 'DMSans';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
`;

interface PreviewTagProps {
  bg?: string;
  fontSize?: string;
}
export const PreviewTag = styled.span<PreviewTagProps>`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  margin: 3px 6px 3px 0;
  border-radius: 30px;
  padding: 5px 20px;
  height: 30px;
  font-size: ${props => props.fontSize || 'inherit'};
  background: ${props => props.bg || 'var(--_tableBg)'};
`;

export const ColumnPanelHeader = styled.div`
  white-space: nowrap;
  width: 100%;
  height: 70px;
  padding: 40px 0 0 0;
  margin-bottom: 30px;
  flex-shrink: 0;
`;

export const PanelTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  color: var(--_primaryColor);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
`;

export const PanelContent = styled.div`
  width: 100%;
  height: calc(100% - 214px);
  padding: 0px 40px;
  margin-bottom: 20px;
  flex: 1 1 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const PanelFotter = styled.div`
  display: flex;
  border-top: 1px solid var(--_borderColor);
  width: 100%;
  height: 120px;
  padding: 30px 40px 40px 40px;
  flex-shrink: 0;
  margin: auto;
  justify-content: space-between;
`;

export const PanelContentLabel = styled.div`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
  color: var(--_primaryColor);
  margin: 0 0 20px 0;
`;
