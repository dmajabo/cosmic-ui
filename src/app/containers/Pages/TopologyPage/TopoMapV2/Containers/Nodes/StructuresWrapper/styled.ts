import styled from 'styled-components';
import { NODES_CONSTANTS } from '../../../model';

export const ContainerWrapperStyles = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${NODES_CONSTANTS.REGION.expanded.bgColor};
  border-radius: ${NODES_CONSTANTS.REGION.expanded.borderRadius + 'px'};
  box-shadow: 0px 4px 7px rgb(67 127 236 / 15%);
`;

export const ContainerHeader = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: space-between;
`;

export const MarkerNode = styled.span`
  display: inline-flex;
  margin: 0 24px 0 0;
  background: ${NODES_CONSTANTS.REGION.expanded.marker.bgColor};
  border-radius: ${NODES_CONSTANTS.REGION.expanded.marker.borderRadius + 'px'} 0 ${NODES_CONSTANTS.REGION.expanded.marker.borderRadius + 'px'} 0;
  cursor: pointer;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  svg {
    vertical-align: top;
    margin: auto;
  }
`;

export const ContainerName = styled.span`
  display: inline-block;
  max-width: calc(100% - 80px);
  margin: auto 12px auto 0;
  font-weight: 500;
  color: ${NODES_CONSTANTS.REGION.labelExpandedStyles.fill};
  font-size: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const CloseBtn = styled.span`
  display: inline-flex;
  margin: 0 0 0 auto;
  cursor: pointer;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  svg {
    vertical-align: top;
    margin: auto;
  }
`;
