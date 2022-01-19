import SecondaryButtonwithEvent from 'app/containers/Pages/AnalyticsPage/components/SecondaryButtonwithEvent';
import { noop } from 'lodash';
import React, { useState } from 'react';
import FilterIcon from '../../icons/performance dashboard/filter';
import { MetricsStyles } from '../../MetricsStyles';
import Select from 'react-select';
import { LookbackLabel, LookbackSelectOption, LookbackValue } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';
import { ConnectivityHealth } from './ConnectivityHealth';

const dropdownStyle = {
  option: provided => ({
    ...provided,
    padding: 10,
    color: 'black',
  }),
  control: provided => ({
    ...provided,
    height: 50,
    border: 'none',
  }),
};

const INITIAL_ANOMALY_TIME_RANGE_VALUE: LookbackSelectOption = {
  label: LookbackLabel.oneWeek,
  value: LookbackValue.oneWeek,
};

const TIME_RANGE_OPTIONS: LookbackSelectOption[] = [
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

export const Sites: React.FC = () => {
  const classes = MetricsStyles();

  const [timeRange, setTimeRange] = useState<LookbackSelectOption>(INITIAL_ANOMALY_TIME_RANGE_VALUE);

  const handleTimeRangeChange = (value: LookbackSelectOption) => setTimeRange(value);

  return (
    <>
      <div className={classes.endFlexContainer}>
        <div>
          <SecondaryButtonwithEvent
            label={
              <>
                <span className={classes.otherButtonText}>FILTER</span>
                <FilterIcon />
              </>
            }
            onClick={noop}
          />
          <span className={classes.anomalyTimeRangeText}>Show:</span>
          <Select styles={dropdownStyle} className={classes.inlineSelect} label="Single select" value={timeRange} options={TIME_RANGE_OPTIONS} onChange={handleTimeRangeChange} />
        </div>
      </div>
      <ConnectivityHealth />
    </>
  );
};
