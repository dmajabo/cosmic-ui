import React from 'react';
import BaseRouting from './BaseRouting';
import LayoutWithHeaderFooterSidebar from 'app/components/LayoutWithHeadeSidebar';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext, useEffect } from 'react';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { BreadCrumbProvider, useBreadCrumbActions } from 'lib/hooks/Breadcrumb/useBreadcrumbDataContext';

export const HomePage: React.FC = () => {
  const { getIdTokenClaims } = useAuth0();
  const breadcrumbActions = useBreadCrumbActions();
  const userContext = useContext<UserContextState>(UserContext);
  useEffect(() => {
    getIdTokenClaims().then(idtoken => {
      userContext.setIdToken(idtoken);
    });
  }, []);
  return userContext.idToken ? (
    <BreadCrumbProvider actions={breadcrumbActions}>
      <LayoutWithHeaderFooterSidebar>
        <BaseRouting />
      </LayoutWithHeaderFooterSidebar>
    </BreadCrumbProvider>
  ) : (
    <>Loading...</>
  );
};
