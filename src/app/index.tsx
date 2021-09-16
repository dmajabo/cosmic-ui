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
import { setupAppTheme } from 'utils/appTheme';
import AppRouting from './AppRouting';
import { AuthProvider, useAuthDataActions } from 'lib/Routes/useAuth';

export function App() {
  const { i18n } = useTranslation();
  const authActions = useAuthDataActions();
  React.useEffect(() => {
    setupAppTheme();
  }, []);

  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s" defaultTitle="Okulis.io" htmlAttributes={{ lang: i18n.language }}>
        <meta name="description" content="" />
      </Helmet>
      <AuthProvider actions={authActions}>
        <Router history={history}>
          <AppRouting />
        </Router>
      </AuthProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}
