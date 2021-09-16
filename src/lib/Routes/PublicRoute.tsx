import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { ROUTE } from './model';
import { useAuthDataContext } from './useAuth';

export interface PublicRouteProps extends RouteProps {
  redirectPath?: string;
}

export const PublicRoute: React.FC<PublicRouteProps> = props => {
  const { authData } = useAuthDataContext();
  // if (authData && authData.isAdmin) {
  //   const renderComponent = () => (<Redirect to={{ pathname: props.redirectPath ? props.redirectPath : ROUTE.admin }} />);
  //   return <Route {...props} component={renderComponent} />;
  // }
  if (authData && authData.authData) {
    const renderComponent = () => <Redirect to={{ pathname: props.redirectPath ? props.redirectPath : ROUTE.app }} />;
    return <Route {...props} component={renderComponent} />;
  }
  return <Route {...props} />;
};
