import styled from 'styled-components';

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
