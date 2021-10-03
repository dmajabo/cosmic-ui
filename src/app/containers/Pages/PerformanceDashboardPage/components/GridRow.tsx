import { Grid } from '@material-ui/core';
import React from 'react';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import { HeatmapMetrics, LegendData } from './Heatmap';
import { TestIdToName } from './PacketLoss';

interface GridRowProps {
  readonly device: string;
  readonly tests: string[];
  readonly heatMapData: HeatmapMetrics;
  readonly legendData: LegendData[];
  readonly selectedRows: TestIdToName;
  readonly dataSuffix: string;
}

const getColor = (legendData: LegendData[], data: number) => {
  const colour = legendData.map((item, index) => {
    return data >= item.low && data <= item.high ? index : -1;
  });
  const index = Math.max(...colour);
  return index === -1 ? 'black' : legendData[index].color;
};

export const GridRow: React.FC<GridRowProps> = ({ dataSuffix, selectedRows, device, tests, heatMapData, legendData }) => {
  const classes = PerformanceDashboardStyles();

  return (
    <>
      <Grid item>
        <div className={classes.deviceName}>{device}</div>
      </Grid>
      {device === ''
        ? tests.map(test => (
            <Grid key={test} item>
              <div className={classes.testName}>{selectedRows[test]}</div>
            </Grid>
          ))
        : tests.map(test => (
            <Grid key={test} item>
              {typeof heatMapData[`${test}_${device}`] === 'undefined' ? (
                <div className={classes.nACell}>N/A</div>
              ) : (
                <div
                  style={{
                    backgroundColor: getColor(legendData, Number(heatMapData[`${test}_${device}`])),
                  }}
                  className={classes.heatmapCell}
                >
                  {heatMapData[`${test}_${device}`] + dataSuffix}
                </div>
              )}
            </Grid>
          ))}
    </>
  );
};
