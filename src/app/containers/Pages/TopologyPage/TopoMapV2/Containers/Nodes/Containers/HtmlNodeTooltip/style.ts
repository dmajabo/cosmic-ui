import styled from 'styled-components';

interface Props {
  minWidth?: string;
  transform?: string;
  padding?: string;
}

export const NodeTooltipBg = styled.div<Props>`
  width: auto;
  height: auto;
  min-width: ${props => props.minWidth || '150px'};
  max-width: 260px;
  white-space: normal;
  word-wrap: break-word;
  text-align: center;
  min-height: 16px;
  padding: ${props => props.padding || '20px'};
  background: var(--_primaryBg);
  transform: ${props => props.transform || 'translateY(-50%)'};
  border-radius: 6px;
  color: var(--_primaryTextColor);
  font-family: 'DMSans';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  pointer-events: none;
`;

export const NodeTooltipWrapper = styled.foreignObject`
  display: none;
  overflow: visible;
  pointer-events: none;
`;

export const HeaderNameRow = styled.div`
  margin: 0 0 10px 0;
  color: var(--_primaryTextColor);
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  text-align: left;
`;

interface HeaderSubTitleRowProps {
  margin?: string;
}
export const SubHeaderRow = styled.div<HeaderSubTitleRowProps>`
  margin: ${props => props.margin || '0 0 20px 0'};
  font-size: 12px;
  line-height: 16px;
  text-align: left;
`;

export const SubHeaderTitleLabel = styled.span`
  display: inline-block;
  font-weight: 500;
  color: var(--_primaryTextColor);
  margin: 0 4px 0 0;
`;

export const SubHeaderTitleValue = styled.span`
  display: inline-block;
  font-weight: normal;
  color: var(--_disabledTextColor);
`;

export const FieldRow = styled.div`
  display: flex;
  height: 40px;
  flex-shrink: 0;
  padding: 10px 12px;
  align-items: center;
  border: 1px solid var(--_rowBorder);
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
`;

export const FieldIcon = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin: auto 10px auto 0;
`;

export const FieldName = styled.span`
  display: inline-block;
  max-width: 100%;
  margin: auto 0;
  color: var(--_primaryTextColor);
`;

export const FieldCount = styled.span`
  display: inline-block;
  width: auto;
  height: 20px;
  min-width: 34px;
  line-height: 16px;
  margin: auto 0 auto 8px;
  color: var(--_primaryWhiteColor);
  background: var(--_pButtonBg);
  text-align: center;
  padding: 2px 10px;
  border-radius: 20px;
`;
