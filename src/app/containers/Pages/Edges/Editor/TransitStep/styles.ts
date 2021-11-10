import styled from 'styled-components';

export const PanelRow = styled.div`
  display: flex;
  margin: 0 0 30px 0;
`;

export const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 380px;
  margin-bottom: 20px;
  .map-container {
    width: 100%;
    height: 100%;
  }
  .mapboxgl-canvas {
    background: var(--_vmBg);
    opacity: 0.7;
  }
  .mapboxgl-map {
    font-family: 'DMSans';
  }
  .mapboxgl-control-container {
    display: none;
  }
`;

export const MapBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: var(--_vmBg);
  opacity: 0.3;
`;

export const ButtonsGroup = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
`;

export const Marker = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  width: auto;
  min-width: 120px;
  background: var(--_primaryBg);
  box-shadow: 0px 20px 30px rgba(5, 20, 58, 0.05);
  border-radius: 6px;
  padding: 12px;
  white-space: nowrap;
  overflow: hidden;
`;

export const MarkerContent = styled.div`
  margin: auto 0;
  font-family: 'DMSans';
  font-style: normal;
`;

export const MarkerRegion = styled.div`
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  color: var(--_primaryColor);
  white-space: nowrap;
  overflow: hidden;
`;

export const MarkerName = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: var(--_disabledTextColor);
  white-space: nowrap;
  overflow: hidden;
`;

export const SelectedTagRow = styled.div`
  display: flex;
  margin: 30px 0 0 0;
  height: 30px;
  align-items: center;
  flex-shrink: 0;
`;

export const SelectdLabel = styled.span`
  display: inline-block;
  flex-shrink: 0;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
  color: var(--_primaryColor);
  margin-right: 12px;
`;
