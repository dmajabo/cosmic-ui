import React from 'react';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import { AnomalyBarChart } from './AnomalyBarChart';

interface ExperienceTabProps {}

export interface BarChartData {
  readonly date: string;
  readonly value: number;
}

const DUMMY_BAR_CHART_DATA: BarChartData[] = [
  {
    date: 'Nov 10',
    value: 40,
  },
  {
    date: 'Nov 11',
    value: 5,
  },
  {
    date: 'Nov 12',
    value: 38,
  },
  {
    date: 'Nov 13',
    value: 30,
  },
  {
    date: 'Nov 14',
    value: 21,
  },
  {
    date: 'Nov 15',
    value: 7,
  },
  {
    date: 'Nov 16',
    value: 15,
  },
];

export const ExperienceTab: React.FC<ExperienceTabProps> = () => {
  const classes = AnalyticsStyles();

  return (
    <div className={classes.anomalyTabPanelContainer}>
      <AnomalyBarChart
        inputData={DUMMY_BAR_CHART_DATA}
        xAxisText={`${DUMMY_BAR_CHART_DATA[0].date} to ${DUMMY_BAR_CHART_DATA[DUMMY_BAR_CHART_DATA.length - 1].date} (1 day interval)`}
        yAxisText="hits"
      />
    </div>
  );
};
