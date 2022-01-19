import React from 'react';
import Page from './Page';
import { SettingsProvider, useSettingsActions } from 'lib/hooks/Settings/useSettingsDataContenxt';
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
