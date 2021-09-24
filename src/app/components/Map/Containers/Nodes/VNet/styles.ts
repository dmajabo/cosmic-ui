import { NODES_CONSTANTS } from 'app/components/Map/model';
import styled from 'styled-components';

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: ${NODES_CONSTANTS.VNet.VnetFill};
  border-radius: ${NODES_CONSTANTS.VNet.borderRadius + 'px'};
`;

export const HeaderWrapper = styled.div`
  width: auto;
  overflow: hidden;
  margin: 0 auto 4px auto;
  background: ${NODES_CONSTANTS.VNet.VnetHeaderFill};
  border-bottom-left-radius: ${NODES_CONSTANTS.VNet.borderRadius + 'px'};
  border-bottom-right-radius: ${NODES_CONSTANTS.VNet.borderRadius + 'px'};
  min-width: 64px;
  max-width: calc(100% - 12px);
  height: ${NODES_CONSTANTS.VNet.headerHeight + 'px'};
  padding: 2px 4px;
  flex-shrink: 0;
  flex-grow: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
// export const HeasderLabel = styled.div`
//   display: flex;
//   width: auto;
//   min-width: 64px;
//   max-width: 100%;
//   margin: 0 auto;
//   height: 100%;
//   background: ${NODES_CONSTANTS.VNet.headerFill};
//   color: ${NODES_CONSTANTS.VNet.headerColor};
//   border-bottom-left-radius: ${NODES_CONSTANTS.VNet.borderRadius + 'px'};
//   border-bottom-right-radius: ${NODES_CONSTANTS.VNet.borderRadius + 'px'};
//   font-size: ${NODES_CONSTANTS.VNet.fontSize + 'px'};
//   padding: 1px 5px;
//   box-sizing: border-box;
//   border: none;
// `;

export const Title = styled.div`
  display: inline-block;
  max-width: 100%;
  margin: auto;
  font-style: normal;
  font-weight: 500;
  font-size: 9px;
  line-height: 16px;
  text-align: center;
  color: var(--_primaryBg);
  vertical-align: top;
  margin-right: 4px;
`;

export const WrapperVms = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(100% - 4px);
  flex-wrap: wrap;
  align-content: start;
  margin: 0 2px;
`;

export const Icon = styled.div`
  display: inline-block;
  width: 13px;
  height: 13px;
  margin-right: 4px;
  line-height: 21px;
  svg {
    vertical-align: top;
    width: 100%;
    height: 100%;
  }
`;
