import React from 'react';
import { ChartLabel, ChartWrapper, ContentWrapper } from '../../Shared/styles';
import Filter from '../Components/Filter';
import LineChart from 'app/components/Charts/LineChart';
interface IProps {}

const TrendsPage: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      <Filter
        items={[
          { id: '1', label: 'test 1' },
          { id: '2', label: 'test 2' },
          { id: '3', label: 'app 2' },
          { id: '4', label: 'app 1' },
        ]}
      />
      <ContentWrapper>
        <ChartWrapper>
          <ChartLabel>Destination Applications</ChartLabel>
          <LineChart />
        </ChartWrapper>
        <ChartWrapper>
          <ChartLabel>Destination Gateway</ChartLabel>
          <LineChart />
        </ChartWrapper>
        <ChartWrapper>
          <ChartLabel>Source Gateway</ChartLabel>
          <LineChart />
        </ChartWrapper>
      </ContentWrapper>
    </>
  );
};

export default React.memo(TrendsPage);
