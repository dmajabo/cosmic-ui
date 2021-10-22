import styled from 'styled-components';
import { InputLabel } from '../styles/Label';

interface Props {
  open?: boolean;
}
export const DropdownWrapper = styled.div<Props>`
  display: inline-flex;
  width: auto;
  align-items: center;
  flex-wrap: nowrap;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  z-index: ${props => (props.open ? 10 : 1)};
  ${InputLabel} {
    margin-right: 12px;
    margin-bottom: 0;
  }
`;

export const SelectWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: var(--_primaryButtonBg);
  border-radius: 6px;
  outline: 0;
  padding: 8px 24px 8px 16px;
  border: 1px solid;
  border-color: var(--_primaryButtonBg);
  cursor: pointer;
  display: flex;
  align-items: center;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  &.active {
    .inheritFill {
      fill: var(--_hoverButtonBg);
    }
  }
`;

export const DropWrapper = styled.div`
  position: relative;
  width: 180px;
  height: 40px;
`;

export const DisplayValueStyles = styled.div`
  color: var(--_disabledTextColor);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: inherit;
  font-size: inherit;
  &.filled {
    color: var(--_primaryColor);
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

interface ListProps {
  position?: 'above' | 'below';
}
export const ListWrapper = styled.div<ListProps>`
  position: absolute;
  top: ${props => (props.position === 'above' ? 'unset' : 'calc(100% + 2px)')};
  bottom: ${props => (props.position === 'above' ? 'calc(100% + 2px)' : 'unset')};
  left: 0;
  width: 100%;
  max-height: 278px;
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
