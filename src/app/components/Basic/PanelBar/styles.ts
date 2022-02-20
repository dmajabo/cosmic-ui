import { ToogleButton } from 'app/components/Sidebar/styles';
import { DEFAULT_TRANSITION } from 'lib/constants/general';
import { IPanelBarLayoutTypes } from 'lib/models/general';
import styled, { css } from 'styled-components';

interface Props {
  type?: IPanelBarLayoutTypes;
  show: boolean;
  height?: string;
  width?: string;
  position?: 'absolute' | 'relative';
  maxWidth?: string;
}

const layout = (props: Props) => {
  if (props.type === IPanelBarLayoutTypes.VERTICAL) {
    return css`
      width: 80vw;
      max-width: ${props.maxWidth};
      height: ${props.height || '100%'};
      border-top: 2px solid;
      border-top-color: var(--_appBg);
      transition-property: margin-right;
      margin-right: ${props.show ? '0' : `-${props.maxWidth}`};
      overflow: hidden;
    `;
  }
  return css`
    width: 100%;
    min-width: 100%;
    height: ${props.height};
    flex-shrink: 0;
    transition-property: margin-bottom;
    margin-bottom: ${props.show ? '0' : `-${props.height}`};
  `;
};
const PanelLayout = (props: Props) => layout(props);
export const PanelWrapperStyles = styled.div<Props>`
  border: none;
  ${PanelLayout};
  display: flex;
  z-index: 10;
  transition: ${DEFAULT_TRANSITION};
`;

export const ResizableHandler = styled.div`
  display: inline-block;
  position: absolute;
  z-index: 1;
  width: 4px;
  height: 50px;
  left: -2px;
  background: var(--_disabledTextColor);
  top: calc(50% - 25px);
  transition: ${DEFAULT_TRANSITION};
  transition-property: left, width;
  cursor: w-resize;
  border-radius: 4px;
  &:hover,
  &:active {
    left: -5px;
    width: 10px;
  }
`;

export const ResizablePanelWrapperStyles = styled.div`
  border: none;
  z-index: 10;
  position: relative;
  height: 100%;
  border-top: 2px solid;
  flex-shrink: 0;
  border-top-color: var(--_appBg);
  display: none;
  &.open {
    display: flex;
  }
  & .dragStart {
    user-select: none !important;
    * {
      user-select: none !important;
    }
  }
  ${ToogleButton} {
    left: -15px;
    right: unset;
    opacity: 1;
    z-index: 1;
  }
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--_primaryBg);
  padding: 40px;
  overflow: hidden;
`;

export const PanelLabel = styled.div`
  width: auto;
  max-width: calc(100% - 12px);
  position: relative;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
  color: var(--_primaryTextColor);
  margin: 0 12px 0 0;
`;

export const PanelContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ContentPanelWrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  min-height: 100%;
  flex-grow: 1;
  position: relative;
`;
