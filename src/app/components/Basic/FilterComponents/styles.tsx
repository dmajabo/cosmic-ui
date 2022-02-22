import styled from 'styled-components';

export const FilterGroupsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

export const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;
  height: auto;
  min-height: 40px;
  border: none;
  /* padding-bottom: 8px; */
  border-bottom: 1px solid var(--_borderColor);
`;

interface HeaderProps {
  disabled?: boolean;
}
export const GroupHeader = styled.div<HeaderProps>`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  padding: 15px 0;
  align-items: center;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  * svg {
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  }
`;

export const GroupLabel = styled.div`
  display: inline-block;
  max-width: 100%;
  flex-shrink: 0;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--_disabledTextColor);
  margin: auto 12px auto 0;
`;

interface GroupItemsWrapperProps {
  maxHeight?: string;
}
export const GroupItemsWrapper = styled.div<GroupItemsWrapperProps>`
  max-height: ${props => props.maxHeight || '400px'};
  margin-bottom: 18px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const FilterGroupItem = styled.div`
  display: flex;
  margin: 0 0 18px 0;
  flex-shrink: 0;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ItemWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 0 auto 0 0;
  cursor: pointer;
`;

interface GLabelProps {
  maxWidth?: string;
}

export const GroupItemLabel = styled.span<GLabelProps>`
  display: inline-block;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  max-width: ${props => props.maxWidth || 'calc(100% - 30px)'};
  text-transform: capitalize;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: var(--_primaryTextColor);
`;

export const GroupItemIcon = styled.span`
  display: inline-block;
  margin: auto 10px auto 0;
  width: 18px;
  height: 18px;
  svg {
    vertical-align: top;
    width: 100%;
    height: 100%;
  }
`;

interface CircleProps {
  color?: string;
}

export const GroupItemColor = styled.span<CircleProps>`
  display: inline-block;
  margin: auto 10px auto 0;
  width: 18px;
  height: 18px;
  border-radius: 6px;
  background: ${props => props.color || 'transparent'};
`;

export const GroupItemCircle = styled.div<CircleProps>`
  display: inline-block;
  width: 12px;
  height: 12px;
  border: none;
  border-radius: 50%;
  background: ${props => props.color || 'var(--_primaryTextColor)'};
  margin: 0 12px 0 0;
`;
