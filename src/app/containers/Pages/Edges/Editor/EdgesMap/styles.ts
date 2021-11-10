import styled from 'styled-components';
import { EDGE_MAP_CONSTANTS } from './helpers';

export const SvgWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
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
