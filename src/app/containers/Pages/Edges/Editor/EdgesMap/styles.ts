import styled from 'styled-components';
import { EDGE_MAP_CONSTANTS } from './helpers';

export const SvgWrapper = styled.div`
  width: 100%;
  height: calc(100% - 38px);
  position: relative;
`;

export const FooterRow = styled.div`
  display: flex;
  width: 100%;
  height: 38px;
  border-radius: 6px 6px 0 0;
  background: var(--_mapFooterbg);
`;

export const MapTitle = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  text-align: center;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
  color: var(--_primaryTextColor);
`;

export const FooterLabel = styled.div`
  width: calc(100% / 3);
  margin: auto 0;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: var(--_primaryTextColor);
`;

export const SvgStyles = styled.svg`
  width: 100%;
  height: 100%;
  #${EDGE_MAP_CONSTANTS.apps} {
    transform: translate(calc(100% - 100% / 3), 0);
  }
  #${EDGE_MAP_CONSTANTS.transit} {
    transform: translate(calc(100% / 3), 0);
  }
`;

export const ExpandCollapseAllWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
`;

export const ExpandCollapseButton = styled.button`
  display: inline-flex;
  margin: 0 auto;
  padding: 0;
  background: transparent;
  border: none;
  outline: 0;
  text-transform: uppercase;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1em;
  text-align: center;
  color: var(--_primaryTextColor);
  cursor: pointer;
`;
