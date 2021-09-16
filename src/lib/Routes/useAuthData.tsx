import * as React from 'react';
import { ITokenResultModel, OKULIS_USER } from 'lib/models/auth';
import { throwAndDisplayWithMessage } from 'lib/api/http/utils';

export interface AuthDataContextType {
  authData: ITokenResultModel | null;
  onLogin: (data: ITokenResultModel) => void;
  onLogout: () => void;
}

export const initialAuthData = (): ITokenResultModel | null => {
  const lsUser: string | null = localStorage.getItem(OKULIS_USER.user);
  if (!lsUser) {
    return null;
  }
  let _user: ITokenResultModel | null = null;
  try {
    _user = JSON.parse(lsUser);
    if (!_user) {
      return null;
    }
    return _user;
  } catch (e) {
    console.error('NOT VALID DATA IN STORAGE', e);
    return null;
  }
};

function useAuthData(): AuthDataContextType {
  const [authData, setAuthData] = React.useState<ITokenResultModel | null>(initialAuthData());

  const onLogout = () => {
    localStorage.removeItem(OKULIS_USER.user);
    setAuthData(null);
  };

  const onLogin = (newAuthData: ITokenResultModel) => {
    if (!newAuthData) {
      throwAndDisplayWithMessage('tokenInfo');
    }
    setAuthData(newAuthData);
    localStorage.setItem(OKULIS_USER.user, JSON.stringify(newAuthData));
  };

  return {
    authData,
    onLogin,
    onLogout,
  };
}

export default useAuthData;
