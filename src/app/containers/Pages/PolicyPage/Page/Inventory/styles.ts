import styled from 'styled-components';

export const LayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(203, 210, 220, 0.5);
`;

export const ComponentTableStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-shrink: 0;
  margin: 0 0 40px 0;
`;

interface PanelTabProps {
  margin?: string;
}
export const PanelTableWrapper = styled.div<PanelTabProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  flex-shrink: 0;
  margin: ${props => props.margin || '0 0 20px 0'};
  &:last-child {
    margin-bottom: 0;
  }
`;

export const TablesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% + 40px);
  padding: 0 40px 0 0;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
`;
