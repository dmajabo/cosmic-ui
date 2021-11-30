import React from 'react';
import { AnalyticsStyles } from '../AnalyticsStyles';
import Select from 'react-select';
import { SelectChartTypeOption } from './MetricsExplorer';
import LineChartIcon from '../icons/metrics explorer/chartType/lineChart.svg';
import StackedBarChartIcon from '../icons/metrics explorer/chartType/stackedBarChart.svg';
import { ChartTypeOption } from './ChartTypeOption';

interface ChartTypeDropdownProps {
  readonly chartType: SelectChartTypeOption;
  readonly handleChartTypeChange: (value: SelectChartTypeOption) => void;
}

export enum ChartType {
  lineChart = 'lineChart',
  stackedBarChart = 'stackedBarChart',
}

const chartTypeOptions: SelectChartTypeOption[] = [
  {
    label: <ChartTypeOption label="Line Chart" image={LineChartIcon} value={ChartType.lineChart} />,
    value: ChartType.lineChart,
  },
  {
    label: <ChartTypeOption label="Stacked Bar Chart" image={StackedBarChartIcon} value={ChartType.stackedBarChart} />,
    value: ChartType.stackedBarChart,
  },
];

export const ChartTypeDropdown: React.FC<ChartTypeDropdownProps> = ({ chartType, handleChartTypeChange }) => {
  const classes = AnalyticsStyles();
  return (
    <div className={classes.lookbackContainer}>
      <Select className={classes.lookbackSelect} label="lookup select" value={chartType} options={chartTypeOptions} onChange={e => handleChartTypeChange(e)} />
    </div>
  );
};
