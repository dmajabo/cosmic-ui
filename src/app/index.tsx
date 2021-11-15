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
import AppRouting from './AppRouting';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s" defaultTitle="Okulis.io" htmlAttributes={{ lang: i18n.language }}>
        <meta name="description" content="" />
      </Helmet>
      <Router history={history}>
        <AppRouting />
      </Router>
      <GlobalStyle />
    </BrowserRouter>
  );
}
