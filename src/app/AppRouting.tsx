import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ROUTE } from 'lib/Routes/model';
import NotFoundPage from 'app/containers/NotFoundPage';
import { ProtectedRouteV2 } from 'lib/Routes/ProtectedRoute';
import LandingPage from 'app/containers/LandingPage';
import { UserToken } from 'lib/Routes/UserToken';
import { RedirectUserToken } from '../lib/Routes/RedirectUserToken';
const AppRouting: React.FC<{}> = () => {
  return (
    <Switch>
      <Route exact path={ROUTE.base} component={LandingPage} />
      <ProtectedRouteV2 exact path={ROUTE.signUp} component={RedirectUserToken} />
      <ProtectedRouteV2 path={ROUTE.app} component={UserToken} />
      <Route exact path={ROUTE.base} render={() => <Redirect to={ROUTE.app} />} />
      <Route path={ROUTE.notFound} component={NotFoundPage} />
    </Switch>
  );
};

export default React.memo(AppRouting);
