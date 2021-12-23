import { APP_HEADER_HEIGHT, DEFAULT_TRANSITION } from 'lib/constants/general';
import styled from 'styled-components';

export const ContainerWithPanel = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  max-height: ${`calc(100vh - ${APP_HEADER_HEIGHT})`};
  overflow: hidden;
  background-color: var(--_appBg);
  &.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
    max-height: 100vh;
  }
`;

export const ContainerWithFooter = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const ContainerWithMetrics = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 80px);
  flex-shrink: 1;
  flex-grow: 1;
  &.withPanel {
    height: 100%;
  }
  transition-property: height;
  transition: ${DEFAULT_TRANSITION};
`;

export const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: auto;
  max-width: 100%;
  height: 100%;
  flex: 1 1 100%;
  transition-property: width;
  transition: ${DEFAULT_TRANSITION};
  padding: 0;
`;

export const StyledMap = styled.svg`
  width: 100%;
  height: 100%;
  .topologyNode {
    opacity: 1;
    transition: opacity 0.2s linear;
  }
  .topologyNode.unhoverNode {
    opacity: 0.5;
    transition: opacity 0.2s linear;
  }
  .topologyNode.hoverNode {
    opacity: 1;
    transition: opacity 0.2s linear;
  }
`;

export const ZoomButtonsWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
`;
