import React from 'react';
import Page from './Page';
import { SessionsProvider, useSessionsActions } from 'lib/hooks/Sessions/useSessionsDataContext';
interface IProps {}

const SessionsPage: React.FC<IProps> = (props: IProps) => {
  const sessionsActions = useSessionsActions();
  return (
    <SessionsProvider actions={sessionsActions}>
      <Page />
    </SessionsProvider>
  );
};

export default React.memo(SessionsPage);
