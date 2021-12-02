import React from 'react';
import './ChartTypeOption.css';
import { SelectChartTypeOption } from './MetricsExplorer';

export const ChartTypeOption: React.FC<SelectChartTypeOption> = ({ label, image, value }) => {
  return (
    <div>
      <span>
        <img className="chartImage" src={image} alt={value} />
      </span>
      <span className="chartTypeText">{label}</span>
    </div>
  );
};
