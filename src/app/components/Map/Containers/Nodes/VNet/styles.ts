import styled from 'styled-components';

export const ContainerWrapper = styled.g`
  transition: all 0.2s ease-in-out;
  /* Hidden init state */
  opacity: 0;
  transform: ${`scale(0)`};
  &.enter,
  &.entered {
    /* Animate in state */
    opacity: 1;
    transform: ${`scale(1)`};
  }
  &.exit,
  &.exited {
    /* Animate out state */
    opacity: 0;
    transform: ${`scale(0)`};
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
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
  line-height: 12px;
  text-align: center;
  color: var(--_primaryColor);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const WrapperVms = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  align-content: start;
`;
