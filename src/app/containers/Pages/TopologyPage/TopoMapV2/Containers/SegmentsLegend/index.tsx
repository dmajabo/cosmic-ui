import React from 'react';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { LegendItem, LegendItemColor, LegendListContainer, LegendName, LegentWrapper } from './styles';

interface Props {}

const SegmentsLegend: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  return (
    <LegentWrapper>
      <LegendListContainer>
        {Object.keys(topology.segments).map(key => {
          if (!topology.segments[key].children || !topology.segments[key].children.length) return null;
          return (
            <LegendItem>
              <LegendItemColor color={topology.segments[key].dataItem.color} />
              <LegendName>{topology.segments[key].dataItem.name}</LegendName>
            </LegendItem>
          );
        })}
      </LegendListContainer>
    </LegentWrapper>
  );
};

export default React.memo(SegmentsLegend);
