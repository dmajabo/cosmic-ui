import { UserProvider } from 'lib/Routes/UserProvider';
import React from 'react';
import { RedirectContainer } from './RedirectContainer';

export const RedirectUserToken: React.FC = () => {
  return (
    <UserProvider>
      <RedirectContainer />
    </UserProvider>
  );
};
