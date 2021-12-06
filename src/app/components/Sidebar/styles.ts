import { DEFAULT_TRANSITION } from 'lib/constants/general';
import styled from 'styled-components';

export const sideBarCloseWidth = '90px';
export const sideBarOpenWidth = '320px';
export const WrapText = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: inherit;
  margin: auto 0 auto 15px;
  white-space: nowrap;
  width: calc(100% - 41px);
  transition: width ${DEFAULT_TRANSITION};
  overflow: hidden;
  text-overflow: ellipsis;
  span {
    vertical-align: middle;
  }
`;

export const ToogleButton = styled.button`
  position: absolute;
  top: calc(50% - 15px);
  right: -15px;
  width: 30px;
  height: 30px;
  padding: 0;
  outline: none;
  border: none;
  border-radius: 50%;
  background: var(--_sidebarBorder);
  cursor: pointer;
  opacity: 0;
  transition: opacity ${DEFAULT_TRANSITION};
`;

interface WrapSidebarProps {
  isOpen?: boolean;
}
export const WrapSidebar = styled.div<WrapSidebarProps>`
  background-color: var(--_primaryColor);
  position: fixed;
  transition: width ${DEFAULT_TRANSITION};
  width: ${props => (props.isOpen ? sideBarOpenWidth : sideBarCloseWidth)};
  flex-shrink: 0;
  height: 100vh;
  z-index: 101;
  ${WrapText} {
    width: ${props => (props.isOpen ? 'calc(100% - 41px)' : '0')};
  }
  &:hover {
    ${ToogleButton} {
      opacity: 1;
    }
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

export const ToogleWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
`;

export const LogoWrapper = styled.div`
  display: flex;
  margin: 16px auto;
  flex-shrink: 0;
  padding: 0 21px;
  height: 48px;
  align-items: center;
`;

export const TransitionWrapper = styled.div<WrapSidebarProps>`
  display: flex;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  width: auto;
  max-width: ${props => (props.isOpen ? '100%' : '48px')};
  transition: max-width ${DEFAULT_TRANSITION};
`;

export const Logo = styled.div`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
`;

export const LogoLabel = styled.span`
  display: inline-block;
  flex-shrink: 0;
  margin: 0 0 0 10px;
  color: var(--_primaryTextColor);
  font-size: 30px;
  line-height: 48px;
  font-style: normal;
  font-weight: 700;
`;

export const DemoLabel = styled.span`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1em;
  margin: auto 0 auto 18px;
  white-space: nowrap;
  color: inherit;
`;

export const DemoBorder = styled.div<WrapSidebarProps>`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #fbfcfe;
  border-radius: 6px;
  opacity: ${props => (props.isOpen ? '0.2' : '0')};
  transition: opacity ${DEFAULT_TRANSITION};
`;

export const Demo = styled.div<WrapSidebarProps>`
  display: flex;
  position: relative;
  margin: auto auto 34px auto;
  flex-shrink: 0;
  height: 55px;
  padding: 10px 17px;
  overflow: hidden;
  color: var(--_primaryTextColor);
  width: ${props => (props.isOpen ? '160px' : '65px')};
  transition-property: width;
  transition: ${DEFAULT_TRANSITION};
  cursor: pointer;
  &:hover {
    ${DemoBorder} {
      opacity: ${props => (props.isOpen ? '0.5' : '0')};
    }
  }
  .demoIcon {
    flex-shrink: 0;
    width: 31px;
    height: 100%;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: auto;
  position: relative;
`;

export const HighlightBg = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  background: transparent;
  transition: opacity ${DEFAULT_TRANSITION};
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
  transition: opacity ${DEFAULT_TRANSITION};
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
  color: var(--_defaultIconColor);
  transition-property: background, color;
  transition: ${DEFAULT_TRANSITION};
  svg .routeIcon {
    fill: var(--_defaultIconColor);
    transition: fill ${DEFAULT_TRANSITION};
  }

  &:hover,
  &.active {
    color: var(--_primaryTextColor);
    svg .routeIcon {
      fill: var(--_primaryTextColor);
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
