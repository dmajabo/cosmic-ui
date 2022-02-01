import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext, useEffect } from 'react';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import LoadingIndicator from 'app/components/Loading';
import { UserRedirect } from './UserRedirect';

export const RedirectContainer: React.FC = () => {
  const { getIdTokenClaims, getAccessTokenSilently, user } = useAuth0();
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
    <UserRedirect />
  ) : (
    <div style={{ marginTop: '50vh' }}>
      <LoadingIndicator />
    </div>
  );
};
