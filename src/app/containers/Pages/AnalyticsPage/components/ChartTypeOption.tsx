import React from 'react';
import './ChartTypeOption.css';
import { SelectChartTypeOption } from './MetricsExplorer';

export const ChartTypeOption: React.FC<SelectChartTypeOption> = ({ label, icon, value }) => {
  return (
    <>
      <span>
        <img className="chartImage" src={icon} alt={value} />
      </span>
      <span className="chartTypeText">{label}</span>
    </>
  );
};
