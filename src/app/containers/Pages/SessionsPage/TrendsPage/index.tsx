import React from 'react';
import { ChartWrapper, ContentWrapper } from '../../Shared/styles';
import SankeyChart from 'app/components/Charts/SankeyChart';
import Filter from '../Components/Filter';
interface IProps {}

const TrendsPage: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      <Filter />
      <ContentWrapper>
        <ChartWrapper>
          <SankeyChart />
        </ChartWrapper>
      </ContentWrapper>
    </>
  );
};

export default React.memo(TrendsPage);
