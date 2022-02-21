import { IdToken, User } from '@auth0/auth0-react';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { IObject } from 'lib/models/general';
import { createContext, useState } from 'react';
declare const pendo: any;
export type UserContextState = {
  idToken?: IdToken;
  setIdToken: (idToken: IdToken) => void;
  accessToken?: string;
  setAccess: (accessToken: string) => void;
  user: User;
  setUser: (u: User) => void;
  vendors: IObject<AccountVendorTypes>;
  setUserVendors: (vendors: AccountVendorTypes[]) => void;
};

const initialValue: UserContextState = {
  idToken: undefined,
  setIdToken: () => {},
  accessToken: undefined,
  setAccess: () => {},
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
  const [user, setUserData] = useState<User | undefined>();
  const [vendors, setVendors] = useState<IObject<AccountVendorTypes>>(null);

  const setAccess = (token: string) => {
    setAccessToken(token);
  };

  const setUser = (u: User) => {
    setUserData(u);
    onInitPendo(u);
  };

  const setUserVendors = (vendors: AccountVendorTypes[]) => {
    if (!vendors || !vendors.length) {
      setVendors({});
      return;
    }
    const _vendorsData: IObject<AccountVendorTypes> = vendors.reduce((obj, v) => {
      obj[v] = v;
      return obj;
    }, {});
    setVendors(_vendorsData);
  };

  const onInitPendo = (u: User) => {
    if (process.env.NODE_ENV !== 'production' || !u) return;
    pendo.initialize({
      visitor: {
        id: u.sub, // Required if user is logged in
        email: u.email, // Recommended if using Pendo Feedback, or NPS Email
        full_name: u.name, // Recommended if using Pendo Feedback
        app: process.env.REACT_APP_API_ENDPOINT_PRODUCTION,
        ...u,

        // You can add any additional visitor level key-values here,
        // as long as it's not one of the above reserved names.
      },

      account: {
        id: 'Okulis.io', // Highly recommended
        // name:         // Optional
        // is_paying:    // Recommended if using Pendo Feedback
        // monthly_value:// Recommended if using Pendo Feedback
        // planLevel:    // Optional
        // planPrice:    // Optional
        // creationDate: // Optional

        // You can add any additional account level key-values here,
        // as long as it's not one of the above reserved names.
      },
    });
  };

  return <UserContext.Provider value={{ idToken, setIdToken, accessToken, setAccess, user, setUser, vendors, setUserVendors }}>{children}</UserContext.Provider>;
};
