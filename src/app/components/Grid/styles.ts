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
  color: ${props => props.color || 'var(--_primaryTextColor)'};
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
  background: ${props => props.color || 'var(--_primaryTextColor)'};
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: auto 12px auto 0;
  user-select: none;
  pointer-events: none;
`;

export const GridCellTotalTag = styled.span`
  background: var(--_tagBg);
  display: inline-block;
  width: auto;
  min-width: 36px;
  height: 22px;
  border-radius: 20px;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  text-align: center !important;
  color: var(--_primaryBg);
  margin: auto auto auto 0;
  padding: 0 10px;
`;

interface PropsCellColor {
  color?: string;
  margin?: string;
}
export const ColorValue = styled.span<PropsCellColor>`
  background: ${props => props.color || 'transparent'};
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin: ${props => props.margin || 'auto'};
  vertical-align: middle;
`;

export const CellValue = styled.span<PropsCellColor>`
  color: ${props => props.color || 'var(--_primaryTextColor)'};
  max-width: 100%;
  display: inline-block;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  margin: auto 0;
`;

interface PropsCellButton {
  margin?: string;
  hoverColor?: string;
}

export const GridButton = styled.button<PropsCellButton>`
  background: transparent;
  display: inline-flex;
  width: 20px;
  height: 20px;
  margin: ${props => props.margin || '0'};
  border: none;
  outline: none;
  padding: 0;
  cursor: pointer;
  svg {
    vertical-align: top;
    width: 16px;
    height: 16px;
    margin: auto;
  }
  &:hover:not(:disabled) {
    .inheritFill {
      fill: ${props => props.hoverColor || 'var(--_highlightColor)'};
    }
  }
  &:disabled {
    cursor: default;
  }
`;

export const CellCheckMarkValue = styled.span`
  display: inline-block;
  margin: auto;
  width: 32px;
  height: 32px;
  svg {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
`;
