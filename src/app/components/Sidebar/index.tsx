import * as React from 'react';
import { logoIcon } from 'app/components/SVGIcons/pagesIcons/logo';
import { demoIcon } from 'app/components/SVGIcons/pagesIcons/demo';
import { APP_PAGES, IPage } from 'lib/Routes/model';
import ListLink from './ListLink';
import { Demo, List, Logo, WrapSidebar } from './styles';

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
      <Logo onClick={props.onToogleSideBar}>{logoIcon()}</Logo>
      <List>
        {APP_PAGES.map(page => (
          <ListLink key={`app_page${page.id}`} isActive={props.activePageId === page.id} icon={page.icon} label={page.pageName} onClick={() => onGoTo(page)} />
        ))}
      </List>
      <Demo>{demoIcon}</Demo>
    </WrapSidebar>
  );
};
export default React.memo(Sidebar);
