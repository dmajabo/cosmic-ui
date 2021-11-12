import styled from 'styled-components';

export const DetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--_pButtonBg);
  flex-shrink: 0;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1em;
  margin-right: 24px;
`;

export const DetailsText = styled.span`
  display: inline-block;
  text-transform: uppercase;
  margin-right: 12px;
  color: inherit;
`;

export const DetailsRowsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;
  border: 1px solid var(--_rowBorder);
`;

interface RowProps {
  hideBorder?: boolean;
}
export const DetailsRow = styled.div<RowProps>`
  display: flex;
  border-bottom: ${props => (props.hideBorder ? 'none' : '1px solid var(--_rowBorder)')};
  flex-shrink: 0;
  padding: 14px 20px;
  align-items: flex-start;
`;

interface RowCellProps {
  width?: string;
  maxWidth?: string;
  highLight?: boolean;
  margin?: string;
}

export const DetailsCell = styled.div<RowCellProps>`
  width: ${props => props.width || '60%'};
  max-width: ${props => props.maxWidth || 'unset'};
  flex-shrink: 0;
  margin: ${props => props.margin || '0'};
  display: inline-block;
  font-weight: ${props => (props.highLight ? 700 : 'normal')};
  font-family: 'DMSans';
  font-style: normal;
  font-size: 16px;
  line-height: 21px;
  color: var(--_primaryColor);
`;
