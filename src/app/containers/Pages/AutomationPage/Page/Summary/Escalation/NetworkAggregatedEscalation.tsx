import { PieDataItem } from 'app/components/Charts/DonutChart';
import { LegendRangeItemStyle, LegendRangeColorStyle, LegendRangeValueStyle } from 'app/containers/Pages/TrafficPage/Trends/Components/FlowsOverviewComponent/RangeItem/style';
import { ALERT_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { uniqueId } from 'lodash';
import React from 'react';
import { LegendContainer, SummaryItemContent } from '../styles';
import { EscalationDonutChart } from './EscalationDonutChart';

interface NetworkAggregatedEscalationProps {
  readonly timeRange: ALERT_TIME_RANGE_QUERY_TYPES;
}

const DUMMY_PIECHART_DATA: PieDataItem[] = [
  {
    id: uniqueId(),
    name: 'Network 1',
    value: 4,
    color: 'green',
    hide: false,
  },
  {
    id: uniqueId(),
    name: 'Network 2',
    value: 8,
    color: 'red',
    hide: false,
  },
  {
    id: uniqueId(),
    name: 'Network 3',
    value: 5,
    color: 'orange',
    hide: false,
  },
];

export const NetworkAggregatedEscalation: React.FC<NetworkAggregatedEscalationProps> = ({ timeRange }) => {
  return (
    <>
      <SummaryItemContent>
        <EscalationDonutChart loading={false} error={null} data={DUMMY_PIECHART_DATA} chartTitle="Latency" />
        <EscalationDonutChart loading={false} error={null} data={DUMMY_PIECHART_DATA} chartTitle="Packet Loss" />
        <EscalationDonutChart loading={false} error={null} data={DUMMY_PIECHART_DATA} chartTitle="Jitter" />
      </SummaryItemContent>
      <LegendContainer>
        {DUMMY_PIECHART_DATA.map(item => (
          <LegendRangeItemStyle key={item.id}>
            <LegendRangeColorStyle color={item.color} />
            <LegendRangeValueStyle>{item.name}</LegendRangeValueStyle>
          </LegendRangeItemStyle>
        ))}
      </LegendContainer>
    </>
  );
};
