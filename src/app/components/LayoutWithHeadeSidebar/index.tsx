import * as React from 'react';
import { WrapperContent, WrapperLayout } from './styles';
import Header from 'app/components/AppHeader';
import Sidebar from 'app/components/Sidebar';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { APP_PAGES, IPage } from 'lib/Routes/model';
import history from 'utils/history';
interface LayoutWithHeaderFooterSidebarProps {}

const LayoutWithHeaderFooterSidebar: React.FC<LayoutWithHeaderFooterSidebarProps> = props => {
  const [currentPage, setCurrentPage] = React.useState<IPage>(null);
  const match: any = useRouteMatch();
  const location = useLocation();
  React.useEffect(() => {
    const _page: IPage = getCurrentPage();
    setCurrentPage(_page);
  }, []);

  const getCurrentPage = (): IPage => {
    const arr = location.pathname.split('/');
    const _page = APP_PAGES.find(it => arr.indexOf(it.id) !== -1 || arr.indexOf(it.path) !== -1);
    return _page;
  };

  const [isOpenSidebar, setIsOpenSidebar] = React.useState(false);

  const onToogleSideBar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const onGoTo = (page: IPage) => {
    setIsOpenSidebar(false);
    if (currentPage && page.id === currentPage.id) return;
    setCurrentPage(page);
    history.push(match.url + page.path);
  };

  return (
    <WrapperLayout>
      <Header currentPage={currentPage} isOpenSidebar={isOpenSidebar} />
      <Sidebar onToogleSideBar={onToogleSideBar} isOpenSidebar={isOpenSidebar} onGoTo={onGoTo} activePageId={currentPage ? currentPage.id : null} />
      <WrapperContent isOpen={isOpenSidebar}>{props.children}</WrapperContent>
    </WrapperLayout>
  );
};

export default LayoutWithHeaderFooterSidebar;
