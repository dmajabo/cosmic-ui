import * as React from 'react';
import { WrapperContent, WrapperLayout } from './styles';
import Header from 'app/components/AppHeader';
import Sidebar from 'app/components/Sidebar';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { APP_PAGES, IPage } from 'lib/Routes/model';
import history from 'utils/history';
import { getSessionStoragePreference, updateSessionStoragePreference } from 'lib/helpers/localStorageHelpers';
import { OKULIS_LOCAL_STORAGE_KEYS } from 'lib/api/http/utils';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
declare const pendo: any;
interface LayoutWithHeaderFooterSidebarProps {}

const LayoutWithHeaderFooterSidebar: React.FC<LayoutWithHeaderFooterSidebarProps> = props => {
  const { user } = React.useContext<UserContextState>(UserContext);
  const [currentPage, setCurrentPage] = React.useState<IPage>(null);
  const [isOpenSidebar, setIsOpenSidebar] = React.useState(false);
  const [isReadyToShow, setIsReadyToShow] = React.useState(false);
  const match: any = useRouteMatch();
  const location = useLocation();
  React.useEffect(() => {
    const _page: IPage = getCurrentPage();
    setCurrentPage(_page);
    let _isSideBarOpen = getSessionStoragePreference(OKULIS_LOCAL_STORAGE_KEYS.OKULIS_SIDE_BAR);
    if (_isSideBarOpen === null || _isSideBarOpen === undefined) {
      setIsOpenSidebar(false);
    } else {
      setIsOpenSidebar(_isSideBarOpen);
    }
    setIsReadyToShow(true);
  }, []);

  const getCurrentPage = (): IPage => {
    const arr = location.pathname.split('/');
    const _page = APP_PAGES.find(it => arr.indexOf(it.id) !== -1 || arr.indexOf(it.path) !== -1);
    return _page;
  };

  const onToogleSideBar = () => {
    const _show = !isOpenSidebar;
    updateSessionStoragePreference(_show, OKULIS_LOCAL_STORAGE_KEYS.OKULIS_SIDE_BAR);
    setIsOpenSidebar(_show);
  };

  const onGoTo = (page: IPage) => {
    // setIsOpenSidebar(false);
    if (currentPage && page.id === currentPage.id) return;
    pendo.track('ROUTE', {
      page: match.url + page.path,
      user: user.sub,
    });
    setCurrentPage(page);
    history.push(match.url + page.path);
  };

  if (!isReadyToShow) return null;
  return (
    <WrapperLayout>
      <Header currentPage={currentPage} isOpenSidebar={isOpenSidebar} />
      <Sidebar onToogleSideBar={onToogleSideBar} isOpenSidebar={isOpenSidebar} onGoTo={onGoTo} activePageId={currentPage ? currentPage.id : null} />
      <WrapperContent isOpen={isOpenSidebar}>{props.children}</WrapperContent>
    </WrapperLayout>
  );
};

export default React.memo(LayoutWithHeaderFooterSidebar);
