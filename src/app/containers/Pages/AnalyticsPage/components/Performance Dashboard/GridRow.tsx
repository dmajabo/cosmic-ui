import { Grid } from '@material-ui/core';
import React from 'react';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';
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

const RED_COLOUR = '#DC4545';

const getColor = (legendData: LegendData[], data: number) => legendData.find(item => data >= item.low && data <= item.high)?.color || RED_COLOUR;

export const GridRow: React.FC<GridRowProps> = ({ dataSuffix, selectedRows, device, tests, heatMapData, legendData }) => {
  const classes = PerformanceDashboardStyles();

  return (
    <>
      <Grid item>
        <div className={classes.deviceName}>{device}</div>
      </Grid>
      {device
        ? tests.map(test => (
            <Grid key={test} item>
              {heatMapData[`${test}_${device}`] ? (
                <div
                  style={{
                    backgroundColor: getColor(legendData, Number(heatMapData[`${test}_${device}`])),
                  }}
                  className={classes.heatmapCell}
                >
                  {heatMapData[`${test}_${device}`] + dataSuffix}
                </div>
              ) : (
                <div className={classes.nACell}>N/A</div>
              )}
            </Grid>
          ))
        : tests.map(test => (
            <Grid key={test} item>
              <div className={classes.testName}>{selectedRows[test]}</div>
            </Grid>
          ))}
    </>
  );
};
