import React from 'react';
import { EdgesProvider, useEdgesActions } from 'lib/hooks/Edges/useEdgesDataContext';
import MainPage from './Page';

interface Props {}

const Edges: React.FC<Props> = (props: Props) => {
  const edgesActions = useEdgesActions();
  return (
    <EdgesProvider actions={edgesActions}>
      <MainPage />
    </EdgesProvider>
  );
};

export default React.memo(Edges);
