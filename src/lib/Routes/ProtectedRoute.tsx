import * as React from 'react';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import { useAuthDataContext } from './useAuth';

export interface ProtectedRouteProps extends RouteProps {
  authenticationPath: string;
}

export const ProtectedRouteV2: React.FC<ProtectedRouteProps> = props => {
  const { authData } = useAuthDataContext();
  const location = useLocation();
  if (!authData || !authData.authData) {
    const renderComponent = () => <Redirect to={{ pathname: props.authenticationPath, state: { from: location.pathname } }} />;
    return <Route {...props} component={renderComponent} />;
  }

  return <Route {...props} />;
};
