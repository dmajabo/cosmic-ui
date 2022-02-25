import React from 'react';
import H2 from 'app/components/Basic/H2';
import InboundTable from './InboundTable';
import OutboundTable from './OutboundTable';
import { LayerWrapper } from '../styles';
import CellularTable from './CellularTable';

interface Props {}

const Layer3 = (props: Props) => {
  return (
    <LayerWrapper style={{ margin: '0 0 40px 0' }}>
      <H2>Layer 3</H2>
      <InboundTable />
      <OutboundTable />
      <CellularTable />
    </LayerWrapper>
  );
};

export default React.memo(Layer3);
