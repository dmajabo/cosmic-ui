import styled from 'styled-components';

interface DashboardItemProps {
  margin?: string;
  flex?: string;
  width?: string;
  height?: string;
}
export const DashboardItemContainer = styled.div<DashboardItemProps>`
  display: inline-flex;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  margin: ${props => props.margin || '0'};
  flex: ${props => props.flex || '1 1 100%'};
  background: var(--_primaryBg);
  border-radius: 6px;
`;
