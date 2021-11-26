import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 2px 0 0 0;
  overflow: hidden;
  max-height: calc(100vh - 81px);
`;

export const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: auto;
  max-width: 100%;
  flex: 1 1 100%;
  height: 100%;
`;

interface PanelColumnProps {
  width?: string;
  maxWidth?: string;
  padding?: string;
}
export const PanelColumn = styled.div<PanelColumnProps>`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || 'auto'};
  max-width: ${props => props.maxWidth || '100%'};
  background: var(--_primaryBg);
  flex-shrink: 0;
  padding: ${props => props.padding || '40px'};
  overflow: hidden;
`;

export const ButtonsGroup = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
`;

export const ModelRow = styled.div`
  display: flex;
  flex-shrink: 0;
  padding: 20px 0 0 0;
`;
