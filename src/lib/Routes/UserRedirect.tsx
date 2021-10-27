import React, { useContext, useEffect, useState } from 'react';
import { PolicyController } from 'lib/api/http/SharedTypes';
import { UserContext, UserContextState } from './UserProvider';
import { createApiClient } from 'lib/api/http/apiClient';
import LoadingIndicator from 'app/components/Loading';
import SignUpPage from 'app/containers/SignUpPage';
import { Redirect } from 'react-router';
import { ROUTE } from './model';

export const UserRedirect: React.FC = () => {
  const [policyControllers, setPolicyControllers] = useState<PolicyController[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userContext = useContext<UserContextState>(UserContext);
  const apiClient = createApiClient(userContext.idToken!);

  useEffect(() => {
    const getPolicyControllers = async () => {
      const responseData = await apiClient.getControllerList();
      setPolicyControllers(responseData.controllers);
    };
    getPolicyControllers();
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [policyControllers]);

  return isLoading ? (
    <div style={{ marginTop: '50vh' }}>
      <LoadingIndicator />
    </div>
  ) : //TODO: change below condition to isEmpty(policyControllers)
  policyControllers.length > 2 ? (
    <Redirect to={ROUTE.app} />
  ) : (
    <SignUpPage />
  );
};
