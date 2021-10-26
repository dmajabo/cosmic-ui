import styled from 'styled-components';

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 90vw;
  height: 90vh;
  max-width: 860px;
  max-height: 800px;
  padding: 30px;
  overflow: hidden;
  background: var(--_primaryBg);
  border-radius: 6px;
  z-index: 2;
`;

export const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  position: relative;
  overflow: hidden;
  background: var(--_primaryBg);
  margin-bottom: 12px;
`;

export const ModalTitle = styled.div`
  text-overflow: ellipsis;
  width: auto;
  max-width: calc(100% - 28px);
  line-height: 40px;
  white-space: nowrap;
  overflow: hidden;
  color: var(--_primaryColor);
  font-weight: 700;
  font-size: 24px;
`;
