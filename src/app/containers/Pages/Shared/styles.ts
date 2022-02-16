import { ToggleButtonWrapper } from 'app/components/Inputs/Toogle/styles';
import { DEFAULT_TRANSITION } from 'lib/constants/general';
import styled from 'styled-components';

interface PageWrapProps {
  width?: string;
  padding?: string;
  bgColor?: string;
}
export const PageWrapperStyles = styled.div<PageWrapProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  padding: ${props => props.padding || '40px'};
`;

export const PageWithPanelWrapperStyles = styled.div<PageWrapProps>`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || '100%'};
  min-height: 100%;
  padding: ${props => props.padding || '20px'};
  background: ${props => props.bgColor || 'transparent'};
  position: relative;
  transition: width ${DEFAULT_TRANSITION};
`;

export const TabsWrapperStyles = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  flex-shrink: 0;
  margin-bottom: 32px;
  border: none;
  border-bottom: 1px solid;
  border-bottom-color: rgba(132, 141, 163, 0.1);
`;

interface IActionRowProps {
  height?: string;
  margin?: string;
  zIndex?: number | string;
}

export const ActionRowStyles = styled.div<IActionRowProps>`
  display: flex;
  width: 100%;
  height: ${props => props.height || '50px'};
  flex-shrink: 0;
  margin: ${props => props.margin || '0 0 20px 0'};
  z-index: ${props => props.zIndex || 11};
`;

interface IPageActionPart {
  margin?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  justifyContent?: string;
  alignItems?: 'flex-start' | 'flex-end' | 'center';
  flex?: string;
}
export const ActionPart = styled.div<IPageActionPart>`
  display: flex;
  align-items: ${props => props.alignItems || 'center'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  width: ${props => props.width || 'auto'};
  max-width: ${props => props.maxWidth || '100%'};
  min-width: ${props => props.minWidth || 'unset'};
  height: 100%;
  flex: ${props => props.flex || '1 1 50%'};
  margin: ${props => props.margin || 0};
  ${ToggleButtonWrapper} {
    background: transparent;
    &:hover {
      background: var(--_appBg);
    }
    &.toogleselected {
      color: var(--_sHoverButtonColor);
      background: var(--_appBg);
    }
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-bottom: 30px;
`;

export const ContentWrapper = styled.div`
  background: var(--_primaryBg);
`;

interface ChartProps {
  height?: string;
  padding?: string;
}
export const ChartWrapper = styled.div<ChartProps>`
  display: flex;
  position: relative;
  background: var(--_chartBg);
  border: 1px solid;
  border-color: var(--_primaryButtonBorder);
  border-radius: 6px;
  margin-bottom: 30px;
  padding: ${props => props.padding || '36px 30px 30px 30px'};
  overflow: hidden;
  height: ${props => props.height || '480px'};
`;

export const ChartLabel = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 25px;
  color: var(--_primaryTextColor);
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 400px;
`;

interface PageContainerWrapperProps {
  margin?: string;
}
export const PageContentWrapper = styled.div<PageContainerWrapperProps>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-radius: 6px;
  padding: 40px;
  margin: ${props => props.margin || '0'};
  background: var(--_primaryBg);
`;
