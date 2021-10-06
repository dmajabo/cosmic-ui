import styled from 'styled-components';

export const EditorPageWrapperStyles = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--_interfaceBg);
`;

export const MainStyles = styled.div`
  display: flex;
  width: calc(100% - 450px);
  height: 100%;
`;

export const ContentStyles = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  background: var(--_primaryBg);
`;

export const PanelStyles = styled.div`
  display: flex;
  width: 80vw;
  max-width: 450px;
  height: calc(100% - 2px);
  margin-top: 2px;
  background: var(--_primaryBg);
`;
