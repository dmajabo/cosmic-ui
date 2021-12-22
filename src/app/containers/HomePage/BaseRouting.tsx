import { ROUTE } from 'lib/Routes/model';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import AnalyticsPage from 'app/containers/Pages/AnalyticsPage';
import DashboardPage from 'app/containers/Pages/DashboardPage';
import TopologyPage from 'app/containers/Pages/TopologyPage';
import SettingsPage from 'app/containers/Pages/SettingsPage';
// import SessionsPage from 'app/containers/Pages/SessionsPage';
import AutomationPage from 'app/containers/Pages/AutomationPage';
import Edges from 'app/containers/Pages/Edges';

export default function BaseRouting() {
  const match = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={`${match.path}${ROUTE.dashboard}`} component={DashboardPage} />
        <Route exact path={`${match.path}${ROUTE.topology}`} component={TopologyPage} />
        <Route exact path={`${match.path}${ROUTE.transit}`} component={Edges} />
        {/* <Route exact path={`${match.path}${ROUTE.sessions}`} component={SessionsPage} /> */}
        <Route exact path={`${match.path}${ROUTE.analytics}`} component={AnalyticsPage} />
        <Route path={`${match.path}${ROUTE.workflow}`} component={AutomationPage} />
        <Route exact path={`${match.path}${ROUTE.settings}`} component={SettingsPage} />
        <Redirect path={ROUTE.notFound} to={`${match.path}${ROUTE.dashboard}`} />
      </Switch>
    </>
  );
}
