import React from 'react';
import { AutomationProvider, useAutomationActions } from 'lib/hooks/Automation/useAutomationDataContext';
import MainPage from './Page/MainPage';
import { AccountsProvider, useAccountsActions } from 'lib/hooks/Accounts/useAccountsDataContext';

interface IProps {}

const AutomationPage: React.FC<IProps> = (props: IProps) => {
  const automationActions = useAutomationActions();
  const accountsActions = useAccountsActions();

  return (
    <AutomationProvider actions={automationActions}>
      <AccountsProvider actions={accountsActions}>
        <MainPage />
      </AccountsProvider>
    </AutomationProvider>
  );
};

export default React.memo(AutomationPage);
