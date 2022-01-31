import { DEFAULT_TRANSITION } from 'lib/constants/general';
import styled from 'styled-components';

interface StateProps {
  open?: boolean;
}
export const LegentWrapper = styled.div`
  position: absolute;
  top: 5%;
  right: 0;
  height: 90%;
  overflow: hidden;
`;

export const SegmentsListWrapper = styled.div<StateProps>`
  display: flex;
  width: ${props => (props.open ? '200px' : '16px')};
  height: auto;
  min-height: 100px;
  max-height: 100%;
  margin: auto 0;
  transition-property: width;
  transition: ${DEFAULT_TRANSITION};
  overflow: hidden;
`;

export const OverflowWrapper = styled.div`
  padding: 15px 0px 15px 15px;
  overflow: hidden;
  border-radius: 6px 0px 0px 6px;
  background: var(--_primaryBg);
  width: calc(100% - 16px);
`;

export const LegendListContainer = styled.div`
  height: auto;
  min-height: 100px;
  max-height: 100%;
  width: 100%;
  padding-right: 20px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const LegendItem = styled.div`
  width: 100%;
  height: 16px;
  display: flex;
  flex-wrap: nowrap;
  margin: 0 0 15px 0px;
  flex-shrink: 0;
  overflow: hidden;
  &:last-child {
    margin-bottom: 0;
  }
`;

interface SegmentColorProps {
  color?: string;
}
export const LegendItemColor = styled.span<SegmentColorProps>`
  width: 16px;
  height: 16px;
  display: inline-block;
  flex-shrink: 0;
  flex-wrap: nowrap;
  margin: 0 10px 0 0;
  border-radius: 4px;
  background: ${props => props.color || 'transparent'};
`;

export const LegendName = styled.span`
  width: auto;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 16px;
  display: inline-block;
  color: var(--_primaryTextColor);
`;

export const ToogleButton = styled.button<StateProps>`
  outline: 0;
  border: none;
  border-radius: 6px 0 0 6px;
  padding: 0;
  display: inline-flex;
  flex-shrink: 0;
  width: 16px;
  height: 60px;
  background: var(--_primaryBg);
  margin: auto 0;
  cursor: pointer;
  svg {
    margin: auto;
    transform: ${props => (props.open ? 'rotate(0)' : 'rotate(-180deg)')};
    transition-property: transform;
    transition: ${DEFAULT_TRANSITION};
  }
`;
