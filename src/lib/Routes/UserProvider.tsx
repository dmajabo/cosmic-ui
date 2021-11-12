import { IdToken } from '@auth0/auth0-react';
import { createContext, useState } from 'react';

export type UserContextState = {
  idToken?: IdToken;
  setIdToken: (idToken: IdToken) => void;
  accessToken?: string;
  setAccessToken: (accessToken: string) => void;
};

const initialValue: UserContextState = {
  idToken: undefined,
  setIdToken: () => {},
  accessToken: undefined,
  setAccessToken: () => {},
};

export const UserContext = createContext<UserContextState>(initialValue);
UserContext.displayName = 'UserContext';

export const UserProvider: React.FC = ({ children }) => {
  const [idToken, setIdToken] = useState<IdToken | undefined>();
  const [accessToken, setAccessToken] = useState<string | undefined>();

  return <UserContext.Provider value={{ idToken, setIdToken, accessToken, setAccessToken }}>{children}</UserContext.Provider>;
};
