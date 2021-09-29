import { Grid } from '@material-ui/core';
import React from 'react';
import { HeatmapMetrics } from './Heatmap';

interface RowProps {
  readonly device: string;
  readonly tests: string[];
  readonly heatMapData: HeatmapMetrics;
}

const GridRow: React.FC<RowProps> = ({ device, tests, heatMapData }) => {
  return (
    <>
      <Grid item xs={4}>
        <div>{device}</div>
      </Grid>
      {device === ''
        ? tests.map(test => (
            <Grid item xs={4}>
              <div>{test}</div>
            </Grid>
          ))
        : tests.map(test => (
            <Grid item xs={4}>
              <div>{heatMapData[`${test}_${device}`]}</div>
            </Grid>
          ))}
    </>
  );
};
export default GridRow;
