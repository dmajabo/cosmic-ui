import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import LoadingIndicator from 'app/components/Loading';

export const ProtectedRouteV2 = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => (
        <div style={{ marginTop: '50vh' }}>
          <LoadingIndicator />
        </div>
      ),
    })}
    {...args}
  />
);
