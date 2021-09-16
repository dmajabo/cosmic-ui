import styled from 'styled-components';
import { sideBarCloseWidth, sideBarOpenWidth, sideBarTransition } from 'app/components/Sidebar/styles';
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
  transition: margin-left ${sideBarTransition}, width ${sideBarTransition};
  margin: 81px 0 0 ${props => (props.isOpen ? sideBarOpenWidth : sideBarCloseWidth)};
  display: flex;
  flex-direction: column;
  position: relative;
  background: var(--_appBg);
`;
