/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Router } from 'react-router-dom';

import GlobalStyle from 'styles/global-styles';
import { useTranslation } from 'react-i18next';
import history from 'utils/history';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ROUTE } from 'lib/Routes/model';
import NotFoundPage from 'app/containers/NotFoundPage';
import { ProtectedRouteV2 } from 'lib/Routes/ProtectedRoute';
import LandingPage from 'app/containers/LandingPage';
import { HomePage } from './containers/HomePage';
import { RedirectContainer } from 'lib/Routes/RedirectContainer';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s" defaultTitle="Okulis.ai" htmlAttributes={{ lang: i18n.language }}>
        <meta name="description" content="" />
      </Helmet>
      <Router history={history}>
        <Switch>
          <Route exact path={ROUTE.base} component={LandingPage} />
          <ProtectedRouteV2 exact path={ROUTE.signUp} component={RedirectContainer} />
          <ProtectedRouteV2 path={ROUTE.app} component={HomePage} />
          <Route exact path={ROUTE.base} render={() => <Redirect to={ROUTE.app} />} />
          <Route path={ROUTE.notFound} component={NotFoundPage} />
        </Switch>
      </Router>
      <GlobalStyle />
    </BrowserRouter>
  );
}
