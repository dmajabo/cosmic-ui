import React from 'react';
import { ChartLabel, ChartWrapper, ContentWrapper } from '../../Shared/styles';
// import Filter from '../Components/Filter';
import LineChart from 'app/components/Charts/LineChart';
// import { jsonClone } from 'lib/helpers/cloneHelper';
// import { IGroupedFilteredItem, trendsfilteredData } from '../Components/Filter/model';
// import Filter from '../Components/Filter';
interface IProps {}

const TrendsPage: React.FC<IProps> = (props: IProps) => {
  // const [filteredDataItems] = React.useState<IGroupedFilteredItem[]>(jsonClone(trendsfilteredData));
  return (
    <>
      {/* <Filter items={filteredDataItems} /> */}
      <ContentWrapper>
        <ChartWrapper>
          <ChartLabel>Destination Applications</ChartLabel>
          <LineChart height="356" />
        </ChartWrapper>
        <ChartWrapper>
          <ChartLabel>Destination Gateway</ChartLabel>
          <LineChart height="356" />
        </ChartWrapper>
        <ChartWrapper>
          <ChartLabel>Source Gateway</ChartLabel>
          <LineChart height="356" />
        </ChartWrapper>
      </ContentWrapper>
    </>
  );
};

export default React.memo(TrendsPage);
