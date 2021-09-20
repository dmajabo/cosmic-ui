import styled from 'styled-components';
import { NODES_CONSTANTS } from 'app/components/Map/model';

interface IProps {
  cols: number;
}
export const VmNodeStyles = styled.div<IProps>`
  display: inline-flex;
  width: 60px;
  height: ${NODES_CONSTANTS.VM.height + 'px'};
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 2px;
  background-color: var(--_primaryBg);
  border-radius: ${NODES_CONSTANTS.VM.borderRadius + 'px'};
  padding: 1px 5px;
  white-space: nowrap;
  align-items: center;
  flex-wrap: nowrap;
  cursor: pointer;
`;

export const Label = styled.div`
  font-size: 10px;
  color: var(--_disabledTextColor);
  max-width: calc(100% - 14px);
  margin-left: 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 8px;
  overflow: hidden;
  align-self: flex-start;
  margin: auto 0 auto 4px;
`;
