import * as React from 'react';
import { AccountsContextType, useAccountsContext } from './useAccounts';

export interface SelectAccountsType {
  accounts: AccountsContextType | null;
}

export const SelectAccountsContext = React.createContext<SelectAccountsType>({
  accounts: null,
});

export const useAccountsDataContext = () => React.useContext(SelectAccountsContext);

export const useAccountsActions = (): SelectAccountsType => {
  const accountsData = useAccountsContext();
  return {
    accounts: accountsData,
  };
};

export const AccountsProvider: React.FC<{ actions: SelectAccountsType }> = props => {
  return <SelectAccountsContext.Provider value={props.actions}>{props.children}</SelectAccountsContext.Provider>;
};
