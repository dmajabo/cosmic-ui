import React from 'react';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { LegendItem, LegendItemColor, LegendListContainer, LegendName, LegentWrapper } from './styles';

interface Props {}

const SegmentsLegend: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  return (
    <LegentWrapper>
      <LegendListContainer>
        {topology.originSegmentsData.map(it => (
          <LegendItem>
            <LegendItemColor color={it.color} />
            <LegendName>{it.name}</LegendName>
          </LegendItem>
        ))}
      </LegendListContainer>
    </LegentWrapper>
  );
};

export default React.memo(SegmentsLegend);
