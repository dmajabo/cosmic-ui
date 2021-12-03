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

export enum ChartTypeValue {
  lineChart = 'lineChart',
  stackedBarChart = 'stackedBarChart',
}

export enum ChartTypeLabel {
  lineChart = 'Line Chart',
  stackedBarChart = 'Stacked Bar Chart',
}

const CHART_TYPE_OPTIONS: SelectChartTypeOption[] = [
  {
    label: ChartTypeLabel.lineChart,
    value: ChartTypeValue.lineChart,
    icon: LineChartIcon,
  },
  {
    label: ChartTypeLabel.stackedBarChart,
    value: ChartTypeValue.stackedBarChart,
    icon: StackedBarChartIcon,
  },
];

export const ChartTypeDropdown: React.FC<ChartTypeDropdownProps> = ({ chartType, handleChartTypeChange }) => {
  const classes = AnalyticsStyles();

  return (
    <div className={classes.lookbackContainer}>
      <Select className={classes.lookbackSelect} label="lookup select" formatOptionLabel={ChartTypeOption} value={chartType} options={CHART_TYPE_OPTIONS} onChange={handleChartTypeChange} />
    </div>
  );
};
