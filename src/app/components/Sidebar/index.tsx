import * as React from 'react';
import { logoIcon } from 'app/components/SVGIcons/pagesIcons/logo';
import { demoIcon } from 'app/components/SVGIcons/pagesIcons/demo';
import { APP_PAGES, IPage } from 'lib/Routes/model';
import ListLink from './ListLink';
import { ContentWrapper, Demo, DemoBorder, DemoLabel, List, Logo, LogoLabel, LogoWrapper, ToogleButton, ToogleWrapper, TransitionWrapper, WrapSidebar } from './styles';
import IconWrapper from '../Buttons/IconWrapper';
import { nextArrow } from '../SVGIcons/arrows';
import { toggleSideBarIcon } from '../SVGIcons/toggleSideBarIcon';

interface SidebarProps {
  activePageId: string;
  isOpenSidebar: boolean;
  onToogleSideBar: () => void;
  onGoTo: (page: IPage) => void;
}
const Sidebar: React.FC<SidebarProps> = props => {
  const onGoTo = (path: IPage) => {
    props.onGoTo(path);
  };

  return (
    <WrapSidebar isOpen={props.isOpenSidebar}>
      <ToogleWrapper>
        <ContentWrapper>
          <LogoWrapper>
            <TransitionWrapper isOpen={props.isOpenSidebar}>
              <Logo>{logoIcon()}</Logo>
              <LogoLabel>Okulis</LogoLabel>
            </TransitionWrapper>
          </LogoWrapper>
          <List>
            {APP_PAGES.map(page => (
              <ListLink key={`app_page${page.id}`} isActive={props.activePageId === page.id} icon={page.icon} label={page.pageName} onClick={() => onGoTo(page)} />
            ))}
          </List>
          {/* <Demo isOpen={props.isOpenSidebar}>
            <DemoBorder isOpen={props.isOpenSidebar} />
            {demoIcon}
            <DemoLabel>DEMO</DemoLabel>
            <IconWrapper styles={{ margin: 'auto 0 auto 26px', flexShrink: 0 }} icon={nextArrow} />
          </Demo> */}
        </ContentWrapper>
        <ToogleButton onClick={props.onToogleSideBar}>{toggleSideBarIcon}</ToogleButton>
      </ToogleWrapper>
    </WrapSidebar>
  );
};
export default React.memo(Sidebar);
