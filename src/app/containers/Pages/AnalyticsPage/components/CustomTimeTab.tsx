import { Checkbox } from '@mui/material';
import React, { useState } from 'react';
import { AnalyticsStyles } from '../AnalyticsStyles';
import Select from 'react-select';
import { SelectOptions } from './MetricsExplorer';

interface CustomTimeTabProps {
  readonly customFromDate: string;
  readonly customToDate: string;
  readonly handleCustomFromDateChange: (value: string) => void;
  readonly handleCustomToDateChange: (value: string) => void;
  readonly show: SelectOptions;
  readonly handleShowChange: (value: SelectOptions) => void;
}

const showOptions: SelectOptions[] = [
  {
    label: 'Hour',
    value: '-1h',
  },
  {
    label: 'Day',
    value: '-1d',
  },
  {
    label: 'Week',
    value: '-7d',
  },
  {
    label: 'Month',
    value: '-30d',
  },
];

export const CustomTimeTab: React.FC<CustomTimeTabProps> = ({ customFromDate, customToDate, handleCustomFromDateChange, handleCustomToDateChange, show, handleShowChange }) => {
  const classes = AnalyticsStyles();
  const [isFromDateChecked, setIsFromDateChecked] = useState<boolean>(false);
  const [isToDateChecked, setIsToDateChecked] = useState<boolean>(true);

  const handleFromCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => setIsFromDateChecked(event.target.checked);

  const handleToCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => setIsToDateChecked(event.target.checked);

  const getSelectTitle = () => {
    if (isFromDateChecked && !isToDateChecked) {
      return 'SHOW THE NEXT';
    }
    if (!isFromDateChecked && isToDateChecked) {
      return 'SHOW THE PREVIOUS';
    }
    return 'SHOW';
  };

  return (
    <div className={classes.customContainer}>
      <div className={classes.blockContainer}>
        <Checkbox checked={isFromDateChecked} onChange={handleFromCheckboxChange} />
        <span className={classes.dateTimeLabelText}>From:</span>
        <input
          value={customFromDate}
          disabled={!isFromDateChecked}
          className={classes.dateTimeInput}
          type="datetime-local"
          id="customFromDate"
          onChange={e => handleCustomFromDateChange(e.target.value)}
        />
      </div>
      <div className={isFromDateChecked && isToDateChecked ? classes.hidden : classes.selectBlockContainer}>
        <div className={classes.tableHeaderText}>{getSelectTitle()}</div>
        <Select className={classes.showSelect} label="lookup select" value={show} options={showOptions} onChange={e => handleShowChange(e)} />
      </div>
      <div className={classes.blockContainer}>
        <Checkbox checked={isToDateChecked} onChange={handleToCheckboxChange} />
        <span className={classes.dateTimeLabelText}>To:</span>
        <input value={customToDate} disabled={!isToDateChecked} className={classes.dateTimeInput} type="datetime-local" id="customToDate" onChange={e => handleCustomToDateChange(e.target.value)} />
      </div>
    </div>
  );
};
