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
  height: calc(100vh - 81px);
  position: relative;
`;

export const ContentStyles = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  background: var(--_primaryBg);
  padding: 30px 0;
`;

export const StepsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: auto;
  width: calc(100% + 30px);
  height: calc(100% - 80px);
  overflow: auto;
  padding: 0 30px;
`;

export const FooterWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  flex-shrink: 0;
  justify-content: space-between;
  padding: 0 30px;
`;

export const StepTitle = styled.div`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
  color: var(--_primaryColor);
  margin: 0 0 20px 0;
  flex-shrink: 0;
`;

export const PanelStyles = styled.div`
  display: flex;
  width: 80vw;
  max-width: 450px;
  height: calc(100% - 2px);
  margin-top: 2px;
  background: var(--_primaryBg);
  padding: 30px;
`;

export const ActionsListWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  height: auto;
`;
