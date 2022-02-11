import React from 'react';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import Select from 'react-select';

export interface LookbackSelectOption {
  readonly label: LookbackLabel;
  readonly value: LookbackValue;
}

interface LookbackTimeTabProps {
  readonly timeRange: LookbackSelectOption;
  readonly handleTimeRangeChange: (value: LookbackSelectOption) => void;
}

export enum LookbackValue {
  fiveMinutes = '-5m',
  fifteenMinutes = '-15m',
  thirtyMinutes = '-30m',
  oneHour = '-1h',
  sixHours = '-6h',
  twelveHours = '-12h',
  twentyFourHours = '-24h',
  oneDay = '-1d',
  oneWeek = '-7d',
  oneMonth = '-30d',
}

export enum LookbackLabel {
  fiveMinutes = 'Last 5 minutes',
  fifteenMinutes = 'Last 15 minutes',
  thirtyMinutes = 'Last 30 minutes',
  oneHour = 'Last Hour',
  sixHours = 'Last 6 Hours',
  twelveHours = 'Last 12 Hours',
  twentyFourHours = 'Last 24 Hours',
  oneDay = 'Last day',
  oneWeek = 'Last week',
  oneMonth = 'Last month',
}

const LOOKBACK_OPTIONS: LookbackSelectOption[] = [
  {
    label: LookbackLabel.fiveMinutes,
    value: LookbackValue.fiveMinutes,
  },
  {
    label: LookbackLabel.fifteenMinutes,
    value: LookbackValue.fifteenMinutes,
  },
  {
    label: LookbackLabel.thirtyMinutes,
    value: LookbackValue.thirtyMinutes,
  },
  {
    label: LookbackLabel.oneHour,
    value: LookbackValue.oneHour,
  },
  {
    label: LookbackLabel.sixHours,
    value: LookbackValue.sixHours,
  },
  {
    label: LookbackLabel.twelveHours,
    value: LookbackValue.twelveHours,
  },
  {
    label: LookbackLabel.twentyFourHours,
    value: LookbackValue.twentyFourHours,
  },
  {
    label: LookbackLabel.oneDay,
    value: LookbackValue.oneDay,
  },
  {
    label: LookbackLabel.oneWeek,
    value: LookbackValue.oneWeek,
  },
  {
    label: LookbackLabel.oneMonth,
    value: LookbackValue.oneMonth,
  },
];

export const LookbackTimeTab: React.FC<LookbackTimeTabProps> = ({ timeRange, handleTimeRangeChange }) => {
  const classes = AnalyticsStyles();
  return (
    <div className={classes.lookbackContainer}>
      <div className={classes.tableHeaderText}>SHOW</div>
      <Select className={classes.lookbackSelect} label="lookup select" value={timeRange} options={LOOKBACK_OPTIONS} onChange={handleTimeRangeChange} />
    </div>
  );
};
