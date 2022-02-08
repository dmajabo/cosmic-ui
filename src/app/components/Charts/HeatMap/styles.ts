import styled from 'styled-components';

interface CellProps {
  bgColor?: string;
  color?: string;
}
export const GridCell = styled.div<CellProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--_rowBorder);
  padding: 8px;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: ${props => props.color || 'var(--_primaryTextColor)'};
  background: ${props => props.bgColor || 'transparent'};
  span {
    display: inline-block;
    margin: auto;
    max-width: 100%;
  }
`;
