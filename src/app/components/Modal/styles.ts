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
