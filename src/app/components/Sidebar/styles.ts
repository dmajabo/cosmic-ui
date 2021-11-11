import styled from 'styled-components';

export const sideBarCloseWidth = '90px';
export const sideBarOpenWidth = '320px';
export const sideBarTransition = '0.8s ease-in-out';
export const WrapText = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: inherit;
  margin: auto 0 auto 15px;
  white-space: nowrap;
  width: calc(100% - 63px);
  transition: width ${sideBarTransition};
  overflow: hidden;
  text-overflow: ellipsis;
  span {
    vertical-align: middle;
  }
`;

interface WrapSidebarProps {
  isOpen?: boolean;
}
export const WrapSidebar = styled.div<WrapSidebarProps>`
  background-color: var(--_primaryColor);
  height: 100%;
  position: fixed;
  transition: width ${sideBarTransition};
  width: ${props => (props.isOpen ? sideBarOpenWidth : sideBarCloseWidth)};
  overflow: auto;
  flex-shrink: 0;
  height: 100vh;
  z-index: 101;
  display: flex;
  flex-direction: column;
  ${WrapText} {
    width: ${props => (props.isOpen ? 'calc(100% - 63px)' : '0')};
  }
`;

export const Logo = styled.div`
  flex-shrink: 0;
  width: 69px;
  height: 69px;
  margin: 0 auto 38px 0;
  padding: 21px 0 0 21px;
  cursor: pointer;
`;

export const Demo = styled.div`
  flex-shrink: 0;
  width: 34px;
  height: 54px;
  padding: 16px 0 0 0;
  margin: auto auto 16px auto;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: auto;
`;

export const HighlightBg = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  background: transparent;
  transition: opacity 0.3s linear;
`;

export const HighlightBorder = styled.div`
  border: 2px solid;
  border-color: transparent;
  background: transparent;
  height: 100%;
  width: 0%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s linear;
`;

export const StyledListLink = styled.div`
  position: relative;
  padding: 22px 32px 22px 28px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  border: none;
  background: transparent;
  transition: background 0.3s linear;
  color: var(--_secondaryTextColor);
  svg {
    opacity: 0.3;
    transition: opacity 0.3s linear;
  }
  &:hover,
  &.active {
    color: var(--_primaryTextColor);
    svg {
      opacity: 1;
    }
    ${HighlightBorder} {
      opacity: 1;
      border-color: var(--_sidebarBorder);
      background: var(--_sidebarBorder);
    }
    ${HighlightBg} {
      opacity: 0.3;
      background: var(--_sidebarGradient);
    }
  }
`;

export const WrapIcon = styled.div`
  display: flex;
  height: 26px;
  width: 26px;
  align-items: center;
  justify-content: center;
  margin: auto 0;
  flex-shrink: 0;
`;
