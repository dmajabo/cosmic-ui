import styled from 'styled-components';
import { sideBarCloseWidth, sideBarOpenWidth } from 'app/components/Sidebar/styles';
import { DEFAULT_TRANSITION } from 'lib/constants/general';
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
  min-height: 100%;
  transition: margin-left ${DEFAULT_TRANSITION}, width ${DEFAULT_TRANSITION};
  margin: 81px 0 0 ${props => (props.isOpen ? sideBarOpenWidth : sideBarCloseWidth)};
  display: flex;
  flex-direction: column;
  position: relative;
  background: var(--_appBg);
`;
