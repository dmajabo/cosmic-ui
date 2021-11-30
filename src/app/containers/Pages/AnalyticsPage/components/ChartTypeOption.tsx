import React from 'react';
import { AnalyticsStyles } from '../AnalyticsStyles';

interface ChartTypeOptionProps {
  readonly image: string;
  readonly label: string;
  readonly value: string;
}

export const ChartTypeOption: React.FC<ChartTypeOptionProps> = ({ label, image, value }) => {
  const classes = AnalyticsStyles();

  return (
    <div className={classes.flexStart}>
      <div>
        <img className={classes.chartImage} src={image} alt={value} />
      </div>
      <div className={classes.chartTypeText}>{label}</div>
    </div>
  );
};
