import React from 'react';
import BaseRouting from './BaseRouting';
import LayoutWithHeaderFooterSidebar from 'app/components/LayoutWithHeadeSidebar';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext, useEffect } from 'react';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';

export const HomePage: React.FC = () => {
  const { getIdTokenClaims } = useAuth0();
  const userContext = useContext<UserContextState>(UserContext);
  useEffect(() => {
    getIdTokenClaims().then(idtoken => {
      userContext.setIdToken(idtoken);
    });
  }, []);
  return userContext.idToken ? (
    <LayoutWithHeaderFooterSidebar>
      <BaseRouting />
    </LayoutWithHeaderFooterSidebar>
  ) : (
    <>Loading...</>
  );
};
