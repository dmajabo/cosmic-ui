import styled from 'styled-components';
import { Icon } from 'app/components/Buttons/IconWrapper/styles';
import { WrapLabel } from 'app/components/Inputs/Checkbox/styles';
import { InputSearch } from 'app/components/Inputs/Search/styles';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: auto;
  min-height: 82px;
  margin: 0 0 20px 0;
`;

export const ValueWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border: 1px solid;
  border-color: rgba(109, 121, 134, 0.3);
  border-radius: 6px;
  padding: 20px 56px 20px 20px;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: var(--_disabledTextColor);
  cursor: pointer;
  background: var(--_primaryBg);
  ${Icon} {
    &.rotation {
      transform: rotate(0deg);
      transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }
  }
  &.active {
    ${Icon} {
      &.rotation {
        transform: rotate(180deg);
      }
    }
  }
`;

export const DisplayValueStyles = styled.span`
  display: inline-block;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: inherit;
  direction: rtl;
  text-align: left;
  vertical-align: bottom;
  &.filled {
    color: var(--_primaryTextColor);
  }
`;

export const Popup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  background: var(--_primaryBg);
  box-shadow: 0px 10px 30px rgba(5, 20, 58, 0.1);
  border-radius: 6px;
  height: auto;
  max-height: 278px;
  overflow: hidden;
  padding: 20px 0 6px 0;
  ${InputSearch} {
    border-color: var(--_primaryButtonBorder);
  }
`;

export const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  font-family: 'DMSans';
`;

export const ListItemStyles = styled.div`
  display: flex;
  flex-shrink: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  padding: 10px 20px;
  align-items: center;
  height: 40px;
  background: transparent;
  cursor: pointer;
  &:hover,
  &.selected {
    background: var(--_vmBg);
  }
  ${WrapLabel} {
    margin-right: 12px;
  }
`;

interface LabelProps {
  primary?: boolean;
}
export const ItemLabel = styled.div<LabelProps>`
  width: calc(100% / 2 - 32px);
  flex-shrink: 0;
  color: ${props => (props.primary ? '#06143B' : '#848DA3')};
`;

export const GroupsWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  padding: 0 20px;
`;

interface GroupProps {
  margin?: string;
}
export const GroupName = styled.div<GroupProps>`
  width: calc(100% / 2 - 32px);
  flex-shrink: 0;
  margin: ${props => props.margin || 0};
  color: var(--_disabledTextColor);
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;
