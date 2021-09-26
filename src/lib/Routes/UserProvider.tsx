import { IdToken } from '@auth0/auth0-react';
import { createContext, useState } from 'react';

export type UserContextState = {
  idToken?: IdToken;
  setIdToken: (idToken: IdToken) => void;
};

const initialValue: UserContextState = {
  idToken: undefined,
  setIdToken: () => {},
};

export const UserContext = createContext<UserContextState>(initialValue);
UserContext.displayName = 'UserContext';

export const UserProvider: React.FC = ({ children }) => {
  const [idToken, setIdToken] = useState<IdToken | undefined>();

  return <UserContext.Provider value={{ idToken, setIdToken }}>{children}</UserContext.Provider>;
};
