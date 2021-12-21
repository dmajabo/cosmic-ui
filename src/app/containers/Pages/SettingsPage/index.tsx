import React from 'react';
import Page from './Page';
import { SettingsProvider, useSettingsActions } from 'lib/hooks/Settings/useSettingsDataContenxt';
import { AccountsProvider, useAccountsActions } from 'lib/hooks/Accounts/useAccountsDataContext';
interface IProps {}

const SettingsPage: React.FC<IProps> = (props: IProps) => {
  const settingsActions = useSettingsActions();
  const accountsActions = useAccountsActions();
  return (
    <SettingsProvider actions={settingsActions}>
      <AccountsProvider actions={accountsActions}>
        <Page />
      </AccountsProvider>
    </SettingsProvider>
  );
};

export default React.memo(SettingsPage);
