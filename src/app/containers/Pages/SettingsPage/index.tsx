import React from 'react';
import { SettingsProvider, useSettingsActions } from 'lib/hooks/Settings/useSettingsDataContenxt';
import Page from './Page';
interface IProps {}

const SettingsPage: React.FC<IProps> = (props: IProps) => {
  const settingsActions = useSettingsActions();
  return (
    <SettingsProvider actions={settingsActions}>
      <Page />
    </SettingsProvider>
  );
};

export default React.memo(SettingsPage);
