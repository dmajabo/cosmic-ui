import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ROUTE } from 'lib/Routes/model';
import { PublicRoute } from 'lib/Routes/PublicRoute';
import HomePage from 'app/containers/HomePage';
import NotFoundPage from 'app/containers/NotFoundPage';
import LoginPage from 'app/containers/LoginPage';
import { ProtectedRouteV2 } from 'lib/Routes/ProtectedRoute';
import LandingPage from 'app/containers/LandingPage';
import SignUpPage from 'app/containers/SignUpPage';
const AppRouting: React.FC<{}> = () => {
  // const authData = useAuthDataContext();

  return (
    <Switch>
      <Route exact path={ROUTE.base} component={LandingPage} />
      <Route exact path={ROUTE.signUp} component={SignUpPage} />
      <PublicRoute path={ROUTE.login} component={LoginPage} />
      <ProtectedRouteV2 path={ROUTE.app} component={HomePage} authenticationPath={ROUTE.base} />
      <Route exact path={ROUTE.base} render={() => <Redirect to={ROUTE.app} />} />
      <Route path={ROUTE.notFound} component={NotFoundPage} />
    </Switch>
  );
};

export default React.memo(AppRouting);
