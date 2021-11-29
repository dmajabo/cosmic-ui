import React from 'react';
import { AnalyticsStyles } from '../AnalyticsStyles';
import Select from 'react-select';
import { SelectChartTypeOptions } from './MetricsExplorer';
import LineChartIcon from '../icons/metrics explorer/chartType/lineChart.svg';
import StackedBarChartIcon from '../icons/metrics explorer/chartType/stackedBarChart.svg';

interface TableTypeDropdownProps {
  readonly chartType: SelectChartTypeOptions;
  readonly handleChartTypeChange: (value: SelectChartTypeOptions) => void;
}

const chartTypeOptions = (): SelectChartTypeOptions[] => {
  const classes = AnalyticsStyles();
  console.log(LineChartIcon);
  return [
    {
      label: (
        <div className={classes.flexStart}>
          <div>
            <img className={classes.chartImage} src={LineChartIcon} alt="lineChart" />
          </div>
          <div className={classes.chartTypeText}>Line Chart</div>
        </div>
      ),
      value: 'lineChart',
    },
    {
      label: (
        <div className={classes.flexStart}>
          <div>
            <img className={classes.chartImage} src={StackedBarChartIcon} alt="lineChart" />
          </div>
          <div className={classes.chartTypeText}>Stacked Bar Chart</div>
        </div>
      ),
      value: 'stackedBarChart',
    },
  ];
};

export const TableTypeDropdown: React.FC<TableTypeDropdownProps> = ({ chartType, handleChartTypeChange }) => {
  const classes = AnalyticsStyles();
  return (
    <div className={classes.lookbackContainer}>
      <Select className={classes.lookbackSelect} label="lookup select" value={chartType} options={chartTypeOptions()} onChange={e => handleChartTypeChange(e)} />
    </div>
  );
};
