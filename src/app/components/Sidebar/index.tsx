import * as React from 'react';
import { logoIcon } from 'app/components/SVGIcons/pagesIcons/logo';
import { demoIcon } from 'app/components/SVGIcons/pagesIcons/demo';
import { APP_PAGES, IPage } from 'lib/Routes/model';
import ListLink from './ListLink';
import { Demo, DemoBorder, DemoLabel, List, Logo, LogoLabel, LogoWrapper, TransitionWrapper, WrapSidebar } from './styles';
import IconWrapper from '../Buttons/IconWrapper';
import { arrowRightIcon, nextArrow } from '../SVGIcons/arrows';

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
      <LogoWrapper>
        <TransitionWrapper isOpen={props.isOpenSidebar} onClick={props.onToogleSideBar}>
          <Logo>{logoIcon()}</Logo>
          <LogoLabel>Okulis</LogoLabel>
        </TransitionWrapper>
      </LogoWrapper>
      <List>
        {APP_PAGES.map(page => (
          <ListLink key={`app_page${page.id}`} isActive={props.activePageId === page.id} icon={page.icon} label={page.pageName} onClick={() => onGoTo(page)} />
        ))}
      </List>
      <Demo isOpen={props.isOpenSidebar}>
        <DemoBorder isOpen={props.isOpenSidebar} />
        {demoIcon}
        <DemoLabel>DEMO</DemoLabel>
        <IconWrapper styles={{ margin: 'auto 0 auto 26px', flexShrink: 0 }} icon={nextArrow} />
      </Demo>
    </WrapSidebar>
  );
};
export default React.memo(Sidebar);
