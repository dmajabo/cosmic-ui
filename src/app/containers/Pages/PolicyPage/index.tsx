import React from 'react';
import { usePolicyActions, PolicyProvider } from 'lib/hooks/Policy/usePolicyDataContext';
import MainPage from './MainPage';

interface Props {}

const PolicyPage: React.FC<Props> = (props: Props) => {
  const policyActions = usePolicyActions();
  return (
    <PolicyProvider actions={policyActions}>
      <MainPage />
    </PolicyProvider>
  );
};

export default React.memo(PolicyPage);
