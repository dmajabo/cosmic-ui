import React from 'react';
import BaseRouting from './BaseRouting';
import LayoutWithHeaderFooterSidebar from 'app/components/LayoutWithHeadeSidebar';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext, useEffect } from 'react';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { BreadCrumbProvider, useBreadCrumbActions } from 'lib/hooks/Breadcrumb/useBreadcrumbDataContext';
import LoadingIndicator from 'app/components/Loading';

export const HomePage: React.FC = () => {
  const { getIdTokenClaims, getAccessTokenSilently, user } = useAuth0();
  const breadcrumbActions = useBreadCrumbActions();
  const userContext = useContext<UserContextState>(UserContext);
  useEffect(() => {
    getIdTokenClaims().then(idtoken => {
      userContext.setIdToken(idtoken);
    });
    getAccessTokenSilently().then(accesstoken => {
      userContext.setAccessToken(accesstoken);
    });
    userContext.setUser(user);
  }, []);
  return userContext.idToken && userContext.accessToken ? (
    <BreadCrumbProvider actions={breadcrumbActions}>
      <LayoutWithHeaderFooterSidebar>
        <BaseRouting />
      </LayoutWithHeaderFooterSidebar>
    </BreadCrumbProvider>
  ) : (
    <div style={{ marginTop: '50vh' }}>
      <LoadingIndicator />
    </div>
  );
};
