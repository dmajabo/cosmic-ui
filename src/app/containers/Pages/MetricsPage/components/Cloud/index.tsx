import { LookbackLabel, LookbackSelectOption, LookbackValue } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';
import SecondaryButtonwithEvent from 'app/containers/Pages/AnalyticsPage/components/SecondaryButtonwithEvent';
import { noop } from 'lodash';
import React, { useState } from 'react';
import Select from 'react-select';
import FilterIcon from '../../icons/performance dashboard/filter';
import { MetricsStyles } from '../../MetricsStyles';
import { Transit } from './Transit';

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

export const Cloud: React.FC = () => {
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
      <Transit timeRange={timeRange} />
    </>
  );
};
