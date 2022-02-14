import { IdToken, User } from '@auth0/auth0-react';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { IObject } from 'lib/models/general';
import { createContext, useState } from 'react';

export type UserContextState = {
  idToken?: IdToken;
  setIdToken: (idToken: IdToken) => void;
  accessToken?: string;
  setAccessToken: (accessToken: string) => void;
  user: User;
  setUser: (u: User) => void;
  vendors: IObject<AccountVendorTypes>;
  setUserVendors: (vendors: AccountVendorTypes[]) => void;
};

const initialValue: UserContextState = {
  idToken: undefined,
  setIdToken: () => {},
  accessToken: undefined,
  setAccessToken: () => {},
  user: undefined,
  setUser: () => {},
  vendors: undefined,
  setUserVendors: () => {},
};

export const UserContext = createContext<UserContextState>(initialValue);
UserContext.displayName = 'UserContext';

export const UserProvider: React.FC = ({ children }) => {
  const [idToken, setIdToken] = useState<IdToken | undefined>();
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [user, setUser] = useState<User | undefined>();
  const [vendors, setVendors] = useState<IObject<AccountVendorTypes>>(null);

  const setUserVendors = (vendors: AccountVendorTypes[]) => {
    if (!vendors || !vendors.length) {
      setVendors(null);
      return;
    }
    const _vendorsData: IObject<AccountVendorTypes> = vendors.reduce((obj, v) => {
      obj[v] = v;
      return obj;
    }, {});
    setVendors(_vendorsData);
  };

  return <UserContext.Provider value={{ idToken, setIdToken, accessToken, setAccessToken, user, setUser, vendors, setUserVendors }}>{children}</UserContext.Provider>;
};
