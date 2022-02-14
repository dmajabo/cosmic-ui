import React, { useContext } from 'react';
import { logoIcon } from 'app/components/SVGIcons/pagesIcons/logo';
import { APP_PAGES, IPage } from 'lib/Routes/model';
import ListLink from './ListLink';
import { ContentWrapper, List, Logo, LogoLabel, LogoWrapper, ToogleButton, ToogleWrapper, TransitionWrapper, WrapSidebar } from './styles';
import { toggleSideBarIcon } from '../SVGIcons/toggleSideBarIcon';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';

interface SidebarProps {
  activePageId: string;
  isOpenSidebar: boolean;
  onToogleSideBar: () => void;
  onGoTo: (page: IPage) => void;
}
const Sidebar: React.FC<SidebarProps> = props => {
  const { vendors } = useContext<UserContextState>(UserContext);

  const onGoTo = (path: IPage) => {
    props.onGoTo(path);
  };

  const getAppPages = () => (vendors && vendors[AccountVendorTypes.AMAZON_AWS] ? APP_PAGES : APP_PAGES.filter(page => page.id !== 'traffic'));

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
            {getAppPages().map(page => (
              <ListLink key={`app_page${page.id}`} isActive={props.activePageId === page.id} icon={page.icon} label={page.pageName} onClick={() => onGoTo(page)} />
            ))}
          </List>
        </ContentWrapper>
        <ToogleButton onClick={props.onToogleSideBar}>{toggleSideBarIcon}</ToogleButton>
      </ToogleWrapper>
    </WrapSidebar>
  );
};
export default React.memo(Sidebar);
