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
  width: 100%;
  height: calc(100% - 60px);
  background: var(--_primaryBg);
`;

export const StepsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: auto;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 40px 40px 20px 40px;
`;

export const FooterWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  padding: 30px 40px;
  border-top: 1px solid var(--_primaryButtonBorder);
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

export const TriggerRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-shrink: 0;
`;

export const GeneralFieldsRow = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-wrap: nowrap;
`;

export const TagsWrapper = styled.div`
  display: flex;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  margin: auto auto auto 0;
`;
