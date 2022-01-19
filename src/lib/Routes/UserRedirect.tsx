import React, { useContext, useEffect, useState } from 'react';
import { PolicyController } from 'lib/api/http/SharedTypes';
import { UserContext, UserContextState } from './UserProvider';
import { createApiClient } from 'lib/api/http/apiClient';
import LoadingIndicator from 'app/components/Loading';
import AddEdges from 'app/containers/SignUpPage';
import { Redirect } from 'react-router';
import { ROUTE } from './model';
import isEmpty from 'lodash/isEmpty';

export const UserRedirect: React.FC = () => {
  const [policyControllers, setPolicyControllers] = useState<PolicyController[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userContext = useContext<UserContextState>(UserContext);
  const apiClient = createApiClient(userContext.accessToken!);

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
  ) : isEmpty(policyControllers) ? (
    <Redirect to={ROUTE.app} />
  ) : (
    //TODO: AddEdges screen to be brought back later on.
    <Redirect to={ROUTE.app} />
  );
};
