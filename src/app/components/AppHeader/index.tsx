import React from 'react';
import IconButton from 'app/components/Buttons/IconButton';
import { HeaderStyles, PageName, Side } from './styles';
import { infoIcon } from 'app/components/SVGIcons/info';
import { notificationIcon } from 'app/components/SVGIcons/notification';
import UserComponent from './UserComponent';
import { BreadCrumbTypes, IPage } from 'lib/Routes/model';
import { useBreadCrumbDataContext } from 'lib/hooks/Breadcrumb/useBreadcrumbDataContext';
import BreadCrumb from 'app/components/BreadCrumb';
import { AutomationBreadCrumbItemsType, EdgesBreadCrumbItemsType } from 'lib/hooks/Breadcrumb/models';
import ModalComponent from 'app/components/Modal';
import AboutComponent from './AboutComponent';
interface Props {
  currentPage: IPage;
  isOpenSidebar?: boolean;
}
const AppHeader: React.FC<Props> = (props: Props) => {
  const { breadcrumb } = useBreadCrumbDataContext();
  const [showAbout, setShowAbout] = React.useState<boolean>(false);
  const onToggleAbout = (value: boolean) => {
    setShowAbout(value);
  };
  const onInfoClick = () => {};
  const onShowNotification = () => {};
  const onAutoMationBreadCrumbChange = (_to: string) => {
    breadcrumb.onGoToAutomation(_to);
  };
  const onEdgesBreadCrumbChange = (_to: string) => {
    breadcrumb.onGoToEdges(_to);
  };
  return (
    <>
      <HeaderStyles isOpenSidebar={props.isOpenSidebar}>
        <Side margin="0 auto 0 0">
          <PageName>{props.currentPage ? props.currentPage.pageName : null}</PageName>
          {props.currentPage && props.currentPage.breadcrumb === BreadCrumbTypes.WORK_FLOW && breadcrumb.automationsBreadCrumbItems && breadcrumb.automationsBreadCrumbItems.length ? (
            <BreadCrumb startItem={AutomationBreadCrumbItemsType.ALL} onClick={onAutoMationBreadCrumbChange} items={breadcrumb.automationsBreadCrumbItems} />
          ) : null}
          {props.currentPage && props.currentPage.breadcrumb === BreadCrumbTypes.TRANSIT && breadcrumb.edgesBreadCrumbItems && breadcrumb.edgesBreadCrumbItems.length ? (
            <BreadCrumb startItem={EdgesBreadCrumbItemsType.EDGES} onClick={onEdgesBreadCrumbChange} items={breadcrumb.edgesBreadCrumbItems} />
          ) : null}
        </Side>
        <Side margin="0 0 0 auto">
          {/* <IconButton icon={infoIcon} onClick={onInfoClick} styles={{ margin: '0 0 0 20px', width: '40px', height: '40px' }} />
          <IconButton icon={notificationIcon} onClick={onShowNotification} styles={{ margin: '0 0 0 20px', width: '40px', height: '40px' }} /> */}
          <UserComponent onOpenAbout={onToggleAbout} />
        </Side>
      </HeaderStyles>
      {showAbout && (
        <ModalComponent
          showHeader
          title="About"
          showCloseButton
          modalStyles={{ maxWidth: '400px', maxHeight: '400px' }}
          useFadeAnimation
          id="aboutModalWindow"
          open={showAbout}
          onClose={() => onToggleAbout(false)}
        >
          <AboutComponent />
        </ModalComponent>
      )}
    </>
  );
};

export default React.memo(AppHeader);
