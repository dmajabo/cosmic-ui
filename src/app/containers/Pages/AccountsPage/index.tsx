import React from 'react';
import { AccountsProvider, useAccountsActions } from 'lib/hooks/Accounts/useAccountsDataContext';
import MainPage from './MainPage';
interface IProps {}

const AccountsPage: React.FC<IProps> = (props: IProps) => {
  const automationActions = useAccountsActions();
  return (
    <AccountsProvider actions={automationActions}>
      <MainPage />
    </AccountsProvider>
  );
};

export default React.memo(AccountsPage);
