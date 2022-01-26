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
  .fullscreen {
    z-index: 10000;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }
`;

export const ContainerWithMetrics = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 50px);
  position: relative;
  .rndTooltip {
    .resize {
      background: var(--_disabledTextColor);
    }
    .resize-t,
    .resize-b {
      width: 20px !important;
      height: 4px !important;
      left: calc(50% - 10px) !important;
    }
    .resize-t {
      top: -2px !important;
    }
    .resize-b {
      bottom: -2px !important;
    }
    .resize-l,
    .resize-r {
      width: 4px !important;
      height: 20px !important;
      top: calc(50% - 10px) !important;
    }
    .resize-l {
      left: -2px !important;
    }
    .resize-r {
      right: -2px !important;
    }
    .resize-rect {
      width: 15px !important;
      height: 15px !important;
      background: transparent;
      border: 4px solid var(--_disabledTextColor);
    }
    .resize-sw {
      bottom: -2px !important;
      left: -2px !important;
      border-top: none;
      border-right: none;
      border-bottom-left-radius: 6px;
    }
    .resize-se {
      bottom: -2px !important;
      right: -2px !important;
      border-top: none;
      border-left: none;
      border-bottom-right-radius: 6px;
    }
    .resize-nw {
      top: -2px !important;
      left: -2px !important;
      border-bottom: none;
      border-right: none;
      border-top-left-radius: 6px;
    }
    .resize-ne {
      top: -2px !important;
      right: -2px !important;
      border-bottom: none;
      border-left: none;
      border-top-right-radius: 6px;
    }
  }
`;

export const ContainerWithLegend = styled.div`
  flex-shrink: 1;
  flex-grow: 1;
  max-width: 100%;
  height: 100%;
  position: relative;
`;

interface MapContainerPRops {
  height?: string;
}
export const MapContainer = styled.div<MapContainerPRops>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: ${props => props.height || 'calc(100% - 80px)'};
`;

export const OverflowStructureMapContainer = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  padding: 24px;
  overflow: auto;
`;

export const StyledMap = styled.svg`
  width: 100%;
  height: 100%;
  .topologyNode {
    opacity: 1;
    transition: opacity 0.2s linear;
    .collapseExpandButton {
      opacity: 0;
    }
  }
  .topologyNode.unHoverNode {
    opacity: 0.5;
    transition: opacity 0.2s linear;
  }
  .topologyNode.hoverNode {
    opacity: 1;
    transition: opacity 0.2s linear;
    .collapseExpandButton {
      opacity: 1;
    }
  }
  .topologyNode.topoDisabledOnDrag {
    & * {
      pointer-events: none;
    }
    & .collapseExpandButton {
      display: none;
    }
  }
  .topologyNode.topoOnDrag .collapseExpandButton {
    display: none;
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
    }
  }
  .selectedTopoLevel1 {
    .vpcCollapsedBg {
      fill: var(--_highlightColor);
      stroke: var(--_highlightColor);
    }
    .wedgeBg {
      transition-property: fill;
      transition: 0.2s linear;
    }
    .deviceBg {
      color: var(--_highlightColor);
    }
  }
  .selectedTopoLevel1Link {
    fill: var(--_highlightColor);
    stroke: var(--_highlightColor);
    transition-property: fill, stroke;
    transition: 0.2s linear;
  }
  .transitionStyle {
    transition-property: all;
    transition: 0.2s linear;
  }
`;
