import React from 'react';
import { PageContentWrapper } from 'app/containers/Pages/Shared/styles';
import Layer3 from './Layer3';
import Layer7 from './Layer7';

interface Props {}

const Inventory: React.FC<Props> = (props: Props) => {
  return (
    <PageContentWrapper margin="0" style={{ minHeight: '100%' }}>
      <Layer3 />
      <Layer7 />
    </PageContentWrapper>
  );
};

export default React.memo(Inventory);
