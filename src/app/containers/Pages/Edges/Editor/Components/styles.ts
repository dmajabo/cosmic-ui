import styled from 'styled-components';

export const ModalFooter = styled.div`
  margin: auto 0 0 0;
  height: 60px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 20px 0;
  overflow: hidden;
  flex-grow: 1;
`;

export const GridWrapper = styled.div`
  width: 100%;
  height: auto;
  max-height: 100%;
  flex-grow: 1;
`;

export const CellContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  position: relative;
`;

export const EmptyMessage = styled.div`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  margin-bottom: 20px;
  color: var(--_disabledTextColor);
  opacity: 0.8;
`;
