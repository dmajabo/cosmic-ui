import * as React from 'react';
import useAuthData, { AuthDataContextType } from './useAuthData';

export interface SelectAuthType {
  authData: AuthDataContextType | null;
}

export const SelectAuthContext = React.createContext<SelectAuthType>({
  authData: null,
});

export const useAuthDataContext = () => React.useContext(SelectAuthContext);

export const useAuthDataActions = (): SelectAuthType => {
  const _authData = useAuthData();
  return {
    authData: _authData,
  };
};

export const AuthProvider: React.FC<{ actions: SelectAuthType }> = props => {
  return <SelectAuthContext.Provider value={props.actions}>{props.children}</SelectAuthContext.Provider>;
};
