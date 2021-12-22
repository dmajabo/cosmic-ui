import styled from 'styled-components';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { Icon } from 'app/components/Buttons/IconWrapper/styles';

export const VmNodeStyles = styled.div`
  display: inline-flex;
  width: ${NODES_CONSTANTS.VM.width + 'px'};
  height: ${NODES_CONSTANTS.VM.height + 'px'};
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 2px;
  background-color: var(--_vmsContainerBg);
  border-radius: ${NODES_CONSTANTS.VM.borderRadius + 'px'};
  padding: 1px 4px;
  white-space: nowrap;
  align-items: center;
  flex-wrap: nowrap;
  cursor: pointer;
  ${Icon} {
    margin: auto 0;
  }
`;

export const Label = styled.div`
  font-size: 11px;
  color: var(--_disabledTextColor);
  max-width: calc(100% - 14px);
  margin-left: 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 19px;
  overflow: hidden;
  align-self: flex-start;
  margin: auto 0 auto 4px;
`;
