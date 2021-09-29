import { HomePage } from 'app/containers/HomePage';
import React from 'react';
import { UserProvider } from './UserProvider';

export const UserToken: React.FC = () => {
  return (
    <UserProvider>
      <HomePage />
    </UserProvider>
  );
};
