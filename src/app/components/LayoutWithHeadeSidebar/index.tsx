import * as React from 'react';
import { WrapperContent, WrapperLayout } from './styles';
import Header from 'app/components/AppHeader';
import Sidebar from 'app/components/Sidebar';

interface LayoutWithHeaderFooterSidebarProps {}

const LayoutWithHeaderFooterSidebar: React.FC<LayoutWithHeaderFooterSidebarProps> = props => {
  const [isOpenSidebar, setIsOpenSidebar] = React.useState(false);

  const onChangeStateSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const onCloseSideBar = () => {
    setIsOpenSidebar(false);
  };

  return (
    <WrapperLayout>
      <Header isOpenSidebar={isOpenSidebar} />
      <Sidebar onCloseSidebar={onCloseSideBar} isOpenSidebar={isOpenSidebar} onChangeStateSidebar={onChangeStateSidebar} />
      <WrapperContent isOpen={isOpenSidebar}>{props.children}</WrapperContent>
    </WrapperLayout>
  );
};

export default LayoutWithHeaderFooterSidebar;
