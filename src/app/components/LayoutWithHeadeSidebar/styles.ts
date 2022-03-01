import styled from 'styled-components';
import { sideBarCloseWidth, sideBarOpenWidth } from 'app/components/Sidebar/styles';
import { APP_HEADER_HEIGHT, DEFAULT_TRANSITION } from 'lib/constants/general';
export const WrapperLayout = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
  min-height: 100vh;
`;

interface LayoutWithHeaderFooterSidebarProps {
  isOpen: boolean;
}
export const WrapperContent = styled.main<LayoutWithHeaderFooterSidebarProps>`
  width: ${props => (props.isOpen ? `calc(100% - ${sideBarOpenWidth})` : `calc(100% - ${sideBarCloseWidth})`)};
  min-height: ${`calc(100vh - ${APP_HEADER_HEIGHT})`};
  transition: margin-left ${DEFAULT_TRANSITION}, width ${DEFAULT_TRANSITION};
  margin: ${APP_HEADER_HEIGHT} 0 0 ${props => (props.isOpen ? sideBarOpenWidth : sideBarCloseWidth)};
  display: flex;
  flex-direction: column;
  position: relative;
  background: var(--_appBg);
`;
