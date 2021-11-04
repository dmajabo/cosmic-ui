import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 2px 0 0 0;
`;

export const MainColumn = styled.div`
  display: flex;
  position: relative;
  width: auto;
  max-width: 100%;
  flex: 1 1 100%;
  height: 100%;
`;

interface MainColumnItemProps {
  background?: string;
}
export const MainColumnItem = styled.div<MainColumnItemProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: calc(100% / 3);
  flex-shrink: 0;
  background: ${props => props.background || 'var(--_defStepperBgColor)'};
`;

interface PanelColumnProps {
  width?: string;
  maxWidth?: string;
  padding?: string;
}
export const PanelColumn = styled.div<PanelColumnProps>`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || 'auto'};
  max-width: ${props => props.maxWidth || '100%'};
  background: var(--_primaryBg);
  flex-shrink: 0;
  padding: ${props => props.padding || '40px'};
  overflow: hidden;
`;

interface ColumnTitleProps {
  primary?: boolean;
}
export const ColumnTitle = styled.div<ColumnTitleProps>`
  width: 100%;
  text-align: center;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: ${props => (props.primary ? '22px' : '16px')};
  line-height: ${props => (props.primary ? '29px' : '21px')};
  color: var(--_primaryColor);
`;
