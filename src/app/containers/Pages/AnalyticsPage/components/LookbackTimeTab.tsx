import React from 'react';
import { AnalyticsStyles } from '../AnalyticsStyles';
import Select from 'react-select';
import { SelectOption } from './MetricsExplorer';

interface LookbackTimeTabProps {
  readonly timeRange: SelectOption;
  readonly handleTimeRangeChange: (value: SelectOption) => void;
}

const lookbackOptions: SelectOption[] = [
  {
    label: 'Last 5 minutes',
    value: '-5m',
  },
  {
    label: 'Last 15 minutes',
    value: '-15m',
  },
  {
    label: 'Last 30 minutes',
    value: '-30m',
  },
  {
    label: 'Last Hour',
    value: '-1h',
  },
  {
    label: 'Last 6 Hours',
    value: '-6h',
  },
  {
    label: 'Last 12 Hours',
    value: '-12h',
  },
  {
    label: 'Last 24 Hours',
    value: '-24h',
  },
  {
    label: 'Last Day',
    value: '-1d',
  },
  {
    label: 'Last Week',
    value: '-7d',
  },
  {
    label: 'Last Month',
    value: '-30d',
  },
];

export const LookbackTimeTab: React.FC<LookbackTimeTabProps> = ({ timeRange, handleTimeRangeChange }) => {
  const classes = AnalyticsStyles();
  return (
    <div className={classes.lookbackContainer}>
      <div className={classes.tableHeaderText}>SHOW</div>
      <Select className={classes.lookbackSelect} label="lookup select" value={timeRange} options={lookbackOptions} onChange={e => handleTimeRangeChange(e)} />
    </div>
  );
};
