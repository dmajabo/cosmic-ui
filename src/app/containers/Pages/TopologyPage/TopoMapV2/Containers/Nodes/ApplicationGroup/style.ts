import styled from 'styled-components';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';

export const WrapStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: ${NODES_CONSTANTS.APP_GROUP.width + 'px'};
  height: ${NODES_CONSTANTS.APP_GROUP.height + 'px'};
  flex-shrink: 0;
  margin: 0 auto 2px auto;
  background-color: var(--_vmsContainerBg);
  border-radius: ${NODES_CONSTANTS.APP_GROUP.borderRadius + 'px'};
  padding: 1px 5px;
  cursor: pointer;
`;

export const Label = styled.div`
  display: inline-block;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  color: var(--_primaryColor);
  max-width: calc(100% - 17px);
  margin: auto 0 auto 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
