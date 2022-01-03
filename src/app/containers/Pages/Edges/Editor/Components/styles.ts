import styled from 'styled-components';

export const ModalFooter = styled.div`
  margin: auto 0 0 0;
  height: 60px;
  flex-shrink: 0;
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
  color: var(--_primaryTextColor);
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

export const DeleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const DialogHeader = styled.div`
  position: relative;
  width: 100%;
  flex-shrink: 0;
`;

interface TextProps {
  color?: string;
  margin?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
}
export const DialogText = styled.div<TextProps>`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: ${props => props.fontWeight || 'bold'};
  font-size: ${props => props.fontSize || '22px'};
  line-height: ${props => props.lineHeight || '29px'};
  text-align: center;
  color: ${props => props.color || 'var(--_primaryTextColor)'};
  margin: ${props => props.margin || '0'};
`;
