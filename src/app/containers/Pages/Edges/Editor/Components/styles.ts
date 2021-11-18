import styled from 'styled-components';

export const ModalFooter = styled.div`
  margin: auto 0 0 0;
  height: 60px;
`;

interface ModalRowProps {
  margin?: string;
  align?: 'center' | 'flex-start' | 'flex-end';
}
export const ModalRow = styled.div<ModalRowProps>`
  margin: ${props => props.margin || '10px 0 20px 0'};
  display: flex;
  flex-wrap: nowrap;
  align-items: ${props => props.align || 'flex-start'};
`;

export const ModalLabel = styled.div`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
  color: var(--_primaryColor);
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
