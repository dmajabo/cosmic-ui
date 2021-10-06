import React from 'react';
import { AutomationProvider, useAutomationActions } from 'lib/hooks/Automation/useAutomationDataContext';
import MainPage from './Page/MainPage';

interface IProps {}

const AutomationPage: React.FC<IProps> = (props: IProps) => {
  const automationActions = useAutomationActions();
  return (
    <AutomationProvider actions={automationActions}>
      <MainPage />
    </AutomationProvider>
  );
};

export default React.memo(AutomationPage);
