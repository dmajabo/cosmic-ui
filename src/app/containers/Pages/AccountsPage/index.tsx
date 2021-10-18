import React from 'react';
import { AccountsProvider, useAccountsActions } from 'lib/hooks/Accounts/useAccountsDataContext';
import MainPage from './MainPage';
interface IProps {}

const AccountsPage: React.FC<IProps> = (props: IProps) => {
  const accountsActions = useAccountsActions();
  return (
    <AccountsProvider actions={accountsActions}>
      <MainPage />
    </AccountsProvider>
  );
};

export default React.memo(AccountsPage);
