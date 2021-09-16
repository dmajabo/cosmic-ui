import * as React from 'react';
import { automationIcon } from 'app/components/SVGIcons/pagesIcons/automation';
import { dashboardIcon } from 'app/components/SVGIcons/pagesIcons/dashboard';
import { logoIcon } from 'app/components/SVGIcons/pagesIcons/logo';
import { policyIcon } from 'app/components/SVGIcons/pagesIcons/policy';
import { topologyIcon } from 'app/components/SVGIcons/pagesIcons/topology';
import { troubleshootIcon } from 'app/components/SVGIcons/pagesIcons/troubleshoot';
import { settingsIcon } from 'app/components/SVGIcons/pagesIcons/settings';
import { analyticsIcon } from 'app/components/SVGIcons/pagesIcons/analytics';
import { demoIcon } from 'app/components/SVGIcons/pagesIcons/demo';
import { ROUTE } from 'lib/Routes/model';
import { useRouteMatch } from 'react-router-dom';
import history from 'utils/history';
import ListLink from './ListLink';
import { Demo, List, Logo, WrapSidebar } from './styles';

interface SidebarProps {
  isOpenSidebar: boolean;
  onChangeStateSidebar: () => void;
  onCloseSidebar: () => void;
}
const Sidebar: React.FC<SidebarProps> = props => {
  const match: any = useRouteMatch();

  const onChangeSidebarPath = (path: string) => {
    props.onCloseSidebar();
    history.push(match.url + path);
  };

  return (
    <WrapSidebar isOpen={props.isOpenSidebar}>
      <Logo onClick={props.onChangeStateSidebar}>{logoIcon()}</Logo>
      <List>
        <ListLink icon={dashboardIcon} label="Dashboard" path={`${match.url}${ROUTE.dashboard}`} onClick={() => onChangeSidebarPath(ROUTE.dashboard)} />
        <ListLink icon={topologyIcon} label="Topology" path={`${match.url}${ROUTE.topology}`} onClick={() => onChangeSidebarPath(ROUTE.topology)} />
        <ListLink icon={policyIcon} label="Policy" path={`${match.url}${ROUTE.policy}`} onClick={() => onChangeSidebarPath(ROUTE.policy)} />
        <ListLink icon={troubleshootIcon} label="Troubleshoot" path={`${match.url}${ROUTE.troubleshoot}`} onClick={() => onChangeSidebarPath(ROUTE.troubleshoot)} />
        <ListLink icon={analyticsIcon} label="Analytics" path={`${match.url}${ROUTE.analytics}`} onClick={() => onChangeSidebarPath(ROUTE.analytics)} />

        <ListLink icon={automationIcon} label="Automation" path={`${match.url}${ROUTE.automation}`} onClick={() => onChangeSidebarPath(ROUTE.automation)} />
        <ListLink icon={settingsIcon} label="Settings" path={`${match.url}${ROUTE.settings}`} onClick={() => onChangeSidebarPath(ROUTE.settings)} />
      </List>
      <Demo>{demoIcon}</Demo>
    </WrapSidebar>
  );
};
export default React.memo(Sidebar);
