import React from 'react';
import './ChartTypeOption.css';
import { SelectChartTypeOption } from './MetricsExplorer';

export const ChartTypeOption: React.FC<SelectChartTypeOption> = ({ label, icon, value }) => {
  return (
    <>
      {icon}
      <span className="chartTypeText">{label}</span>
    </>
  );
};
