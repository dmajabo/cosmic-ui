import { Checkbox } from '@mui/material';
import React, { useState } from 'react';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import Select from 'react-select';
import { LookbackValue } from './LookbackTimeTab';

export interface CustomTimeRangeSelectOption {
  readonly label: CustomTimeRangeLabel;
  readonly value: LookbackValue;
}

interface CustomTimeTabProps {
  readonly fromDate: string;
  readonly toDate: string;
  readonly onFromDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly onToDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly timeRange: CustomTimeRangeSelectOption;
  readonly onTimeRangeChange: (value: CustomTimeRangeSelectOption) => void;
}

export enum CustomTimeRangeLabel {
  oneHour = 'Hour',
  oneDay = 'Day',
  oneWeek = 'Week',
  oneMonth = 'Month',
}

const TIME_RANGE_OPTIONS: CustomTimeRangeSelectOption[] = [
  {
    label: CustomTimeRangeLabel.oneHour,
    value: LookbackValue.oneHour,
  },
  {
    label: CustomTimeRangeLabel.oneDay,
    value: LookbackValue.oneDay,
  },
  {
    label: CustomTimeRangeLabel.oneWeek,
    value: LookbackValue.oneWeek,
  },
  {
    label: CustomTimeRangeLabel.oneMonth,
    value: LookbackValue.oneMonth,
  },
];

const SHOW_NEXT = 'SHOW THE NEXT';
const SHOW_PREVIOUS = 'SHOW THE PREVIOUS';
const DEFAULT_SHOW = 'SHOW';

export const CustomTimeTab: React.FC<CustomTimeTabProps> = ({ fromDate, toDate, onFromDateChange, onToDateChange, timeRange, onTimeRangeChange }) => {
  const classes = AnalyticsStyles();
  const [isFromDateChecked, setIsFromDateChecked] = useState<boolean>(false);
  const [isToDateChecked, setIsToDateChecked] = useState<boolean>(true);

  const handleFromCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => setIsFromDateChecked(event.target.checked);

  const handleToCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => setIsToDateChecked(event.target.checked);

  const getSelectTitle = () => {
    if (isFromDateChecked && !isToDateChecked) {
      return SHOW_NEXT;
    }
    if (!isFromDateChecked && isToDateChecked) {
      return SHOW_PREVIOUS;
    }
    return DEFAULT_SHOW;
  };

  return (
    <div className={classes.customContainer}>
      <div className={classes.blockContainer}>
        <Checkbox checked={isFromDateChecked} onChange={handleFromCheckboxChange} />
        <div className={classes.labelContainer}>
          <span className={classes.dateTimeLabelText}>From:</span>
        </div>
        <input value={fromDate} disabled={!isFromDateChecked} className={classes.dateTimeInput} type="datetime-local" id="customFromDate" onChange={onFromDateChange} />
      </div>
      <div className={isFromDateChecked && isToDateChecked ? classes.hidden : classes.selectBlockContainer}>
        <div className={classes.tableHeaderText}>{getSelectTitle()}</div>
        <Select className={classes.showSelect} label="lookup select" value={timeRange} options={TIME_RANGE_OPTIONS} onChange={onTimeRangeChange} />
      </div>
      <div className={classes.blockContainer}>
        <Checkbox checked={isToDateChecked} onChange={handleToCheckboxChange} />
        <div className={classes.labelContainer}>
          <span className={classes.dateTimeLabelText}>To:</span>
        </div>
        <input value={toDate} disabled={!isToDateChecked} className={classes.dateTimeInput} type="datetime-local" id="customToDate" onChange={onToDateChange} />
      </div>
    </div>
  );
};
