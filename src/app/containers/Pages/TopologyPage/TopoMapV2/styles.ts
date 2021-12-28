import { APP_HEADER_HEIGHT } from 'lib/constants/general';
import styled from 'styled-components';

export const TopoContainer = styled.div`
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
    z-index: 10001;
    max-height: 100vh;
  }
`;

export const ContainerWithFooter = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  max-width: 100%;
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
`;

export const ContainerWithMetrics = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 70px);
  flex-shrink: 1;
  flex-grow: 1;
`;

export const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
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
  .peerConnectionNodeWrapperHover {
    .peerConnectionNode {
      fill: var(--_highlightColor);
      transition: fill 0.2s linear;
    }
    .peerConnectionNodeIcon {
      color: var(--_primaryBg);
      transition: color 0.2s linear;
    }
    .peerConnectionLink {
      stroke: var(--_highlightColor);
      transition: stroke 0.2s linear;
    }
  }
  .vpsHoverStroke {
    .vpcCollapsedBg {
      stroke: var(--_highlightColor);
      transition: stroke 0.2s linear;
    }
  }
`;
