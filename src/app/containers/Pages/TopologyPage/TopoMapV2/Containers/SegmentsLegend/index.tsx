import React from 'react';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { LegendItem, LegendItemColor, LegendListContainer, LegendName, LegentWrapper, ToogleButton, SegmentsListWrapper, OverflowWrapper } from './styles';
import { pagingPrewArrow } from 'app/components/SVGIcons/arrows';

interface Props {}

const SegmentsLegend: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const [open, setOpen] = React.useState<boolean>(false);

  const onToogleState = () => {
    setOpen(!open);
  };
  return (
    <LegentWrapper>
      <SegmentsListWrapper open={open}>
        <ToogleButton open={open} onClick={onToogleState}>
          {pagingPrewArrow}
        </ToogleButton>
        <OverflowWrapper>
          <LegendListContainer>
            {Object.keys(topology.segments).map(key => {
              if (!topology.segments[key].children || !topology.segments[key].children.length) return null;
              return (
                <LegendItem>
                  <LegendItemColor color={topology.segments[key].dataItem.color} />
                  <LegendName title={topology.segments[key].dataItem.name}>{topology.segments[key].dataItem.name}</LegendName>
                </LegendItem>
              );
            })}
          </LegendListContainer>
        </OverflowWrapper>
      </SegmentsListWrapper>
    </LegentWrapper>
  );
};

export default React.memo(SegmentsLegend);
