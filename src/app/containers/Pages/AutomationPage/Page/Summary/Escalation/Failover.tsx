import { ALERT_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import React from 'react';
import { BarChart, BarChartData } from './BarChart';

interface FailoverProps {
  readonly timeRange: ALERT_TIME_RANGE_QUERY_TYPES;
}

const DUMMY_BAR_CHART_DATA: BarChartData[] = [
  {
    date: 'Nov 11',
    value: 18,
  },
  {
    date: 'Nov 12',
    value: 45,
  },
  {
    date: 'Nov 13',
    value: 56,
  },
  {
    date: 'Nov 14',
    value: 12,
  },
];

export const Failover: React.FC<FailoverProps> = ({ timeRange }) => {
  return (
    <div style={{ height: 400 }}>
      <BarChart inputData={DUMMY_BAR_CHART_DATA} xAxisText="2021-11-12 to 2021-11-18 (1 day)" yAxisText="Failovers" chartTitle="Cellular Failover" />
    </div>
  );
};
