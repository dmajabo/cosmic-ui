import { ROUTE } from 'lib/Routes/model';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import PolicyPage from 'app/containers/Pages/PolicyPage';
import AnalyticsPage from 'app/containers/Pages/AnalyticsPage';
import DashboardPage from 'app/containers/Pages/DashboardPage';
import TopologyPage from 'app/containers/Pages/TopologyPage';
import PerformanceDashboardPage from 'app/containers/Pages/PerformanceDashboardPage';
import SettingsPage from 'app/containers/Pages/SettingsPage';
import SessionsPage from 'app/containers/Pages/SessionsPage';
import AutomationPage from 'app/containers/Pages/AutomationPage';
import AccountsPage from 'app/containers/Pages/AccountsPage';
import Edges from 'app/containers/Pages/Edges';

export default function BaseRouting() {
  const match = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={`${match.path}${ROUTE.dashboard}`} component={DashboardPage} />
        <Route exact path={`${match.path}${ROUTE.topology}`} component={TopologyPage} />
        <Route exact path={`${match.path}${ROUTE.edges}`} component={Edges} />
        <Route exact path={`${match.path}${ROUTE.policy}`} component={PolicyPage} />
        <Route exact path={`${match.path}${ROUTE.performanceDashboard}`} component={PerformanceDashboardPage} />
        <Route exact path={`${match.path}${ROUTE.sessions}`} component={SessionsPage} />
        <Route exact path={`${match.path}${ROUTE.analytics}`} component={AnalyticsPage} />
        <Route path={`${match.path}${ROUTE.automation}`} component={AutomationPage} />
        <Route path={`${match.path}${ROUTE.accounts}`} component={AccountsPage} />
        <Route exact path={`${match.path}${ROUTE.settings}`} component={SettingsPage} />
        <Redirect path={ROUTE.notFound} to={`${match.path}${ROUTE.dashboard}`} />
      </Switch>
    </>
  );
}
