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
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  position: relative;
  background: var(--_primaryBg);
  margin-bottom: 12px;
`;

export const ModalTitle = styled.div`
  text-overflow: ellipsis;
  width: 100%;
  line-height: 40px;
  white-space: nowrap;
  overflow: hidden;
  color: var(--_primaryColor);
  font-weight: 700;
  font-size: 24px;
`;

export const DeleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;

interface IconProps {
  width?: string;
  height?: string;
}
export const IconStyles = styled.div<IconProps>`
  margin: 0 auto 30px auto;
  width: ${props => props.width || '140px'};
  height: ${props => props.height || '140px'};
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--_tableBg);
  flex-shrink: 0;
  border-radius: 50%;
  svg {
    margin: auto;
  }
`;
