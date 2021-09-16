import styled from 'styled-components';
import { InputLabel } from '../styles/Label';

export const DropdownWrapper = styled.div`
  display: inline-flex;
  width: auto;
  align-items: center;
  flex-wrap: nowrap;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  z-index: 1;
  ${InputLabel} {
    margin-right: 12px;
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 180px;
  height: 40px;
  background: var(--_primaryButtonBg);
  border-radius: 6px;
  outline: 0;
  padding: 8px 24px 8px 16px;
  border: 1px solid;
  border-color: var(--_primaryButtonBg);
  color: var(--_primaryColor);
  cursor: pointer;
  &.active {
    .inheritFill {
      fill: var(--_hoverButtonBg);
    }
  }
`;

export const Label = styled.span`
  display: inline-block;
  margin-right: 12px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: var(--_disabledTextColor);
`;

export const ListWrapper = styled.div`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  width: 180px;
  max-height: 200px;
  height: auto;
  min-height: 100px;
  overflow-x: hidden;
  overflow-y: auto;
  border: none;
  border-radius: 6px;
  background: var(--_primaryButtonBg);
  padding: 8px 0;
  box-shadow: 0px 15px 50px rgba(132, 141, 163, 0.15);
`;

interface IDropdownItemProps {
  active?: boolean;
}
export const DropdownItemWrapper = styled.div<IDropdownItemProps>`
  width: 100%;
  height: 40px;
  padding: 8px 20px;
  line-height: 23px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  font-size: 14px;
  color: ${props => (props.active ? 'var(--_hoverButtonBg)' : 'var(--_primaryColor)')};
  background: ${props => (props.active ? 'var(--_vmBg)' : 'var(--_primaryTextColor)')};
  &:hover {
    color: var(--_hoverButtonBg);
    background: var(--_vmBg);
  }
`;
