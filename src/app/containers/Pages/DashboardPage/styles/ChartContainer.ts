import styled from 'styled-components';

interface DashboardItemProps {
  margin?: string;
  flex?: string;
  width?: string;
  height?: string;
}
export const DashboardItemContainer = styled.div<DashboardItemProps>`
  display: inline-flex;
  flex-direction: column;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  margin: ${props => props.margin || '0'};
  flex: ${props => props.flex || '1 1 100%'};
  background: var(--_primaryBg);
  border-radius: 6px;
  font-family: 'DMSans';
  padding: 35px 30px 30px 30px;
`;

export const DashboardItemLabel = styled.div`
  display: inline-block;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  color: var(--_primaryTextColor);
  margin: 0 12px 30px 0;
  flex-shrink: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: calc(100% - 12px);
`;

export const DashboardItemContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: nowrap;
  flex-shrink: 0;
`;
