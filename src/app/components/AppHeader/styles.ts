import styled from 'styled-components';
import { sideBarCloseWidth, sideBarOpenWidth, sideBarTransition } from 'app/components/Sidebar/styles';
interface HeaderStyleProps {
  isOpenSidebar: boolean;
}

export const HeaderStyles = styled.div<HeaderStyleProps>`
  display: flex;
  position: fixed;
  top: 0;
  left: ${props => (props.isOpenSidebar ? sideBarOpenWidth : sideBarCloseWidth)};
  height: 81px;
  width: ${props => (props.isOpenSidebar ? `calc(100% - ${sideBarOpenWidth})` : `calc(100% - ${sideBarCloseWidth})`)};
  flex-wrap: nowrap;
  padding: 20px 30px;
  background: var(--_primaryBg);
  z-index: 100;
  transition: width ${sideBarTransition}, left ${sideBarTransition};
`;

interface ISideBlock {
  margin: string;
}
export const Side = styled.div<ISideBlock>`
  display: flex;
  margin: ${props => props.margin || 'auto'};
  max-width: 100%;
  height: 100%;
`;

export const PageName = styled.div`
  max-width: 100%;
  overflow: hidden;
  text-align: center;
  width: auto;
  font-weight: bold;
  font-size: 30px;
  color: #05143a;
  text-transform: capitalize;
`;

export const UserWrapper = styled.div`
  display: inline-flex;
  width: auto;
  min-width: 100px;
  max-width: 400px;
  margin-left: 20px;
  flex-shrink: 0;
  cursor: pointer;
  position: relative;
`;

export const User = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  max-width: calc(100% - 56px);
  margin: auto 0 auto 16px;
  flex-shrink: 0;
  font-style: normal;
`;

export const UserName = styled.div`
  width: 100%;
  font-weight: 700;
  font-size: 16px;
  color: var(--_primaryColor);
`;
export const UserRole = styled.div`
  width: 100%;
  font-weight: 500;
  font-size: 12px;
  color: var(--_defaultInputColor);
`;
