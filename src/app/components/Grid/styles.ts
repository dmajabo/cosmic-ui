import styled from 'styled-components';

export const GridCellWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  position: relative;
`;

interface ICellProps {
  color?: string;
  cursor?: 'pointer' | 'default';
}
export const GridCellLabel = styled.span<ICellProps>`
  color: ${props => props.color || 'var(--_primaryColor)'};
  max-width: 100%;
  display: inline-block;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  margin: auto 0;
  cursor: ${props => props.cursor || 'pointer'};
`;

interface ICellProps {
  color?: string;
  cursor?: 'pointer' | 'default';
}
export const GridCellStatusCircle = styled.span<ICellProps>`
  background: ${props => props.color || 'var(--_primaryColor)'};
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: auto 12px auto 0;
  user-select: none;
  pointer-events: none;
`;
