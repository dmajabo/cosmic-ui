import React from 'react';
import { SessionsProvider, useSessionsActions } from 'lib/hooks/Sessions/useSessionsDataContext';
import MainPage from './MainPage';
import { TrafficProvider, useTrafficActions } from 'lib/hooks/Traffic/useTrafficDataCont';

interface Props {}

const TrafficPage: React.FC<Props> = (props: Props) => {
  const trafficActions = useTrafficActions();
  const sessionsActions = useSessionsActions();

  return (
    <TrafficProvider actions={trafficActions}>
      <SessionsProvider actions={sessionsActions}>
        <MainPage />
      </SessionsProvider>
    </TrafficProvider>
  );
};

export default React.memo(TrafficPage);
