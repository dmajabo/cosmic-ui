import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import { HeatMapData } from '../SharedTypes';
import { Data } from './Table';
import GridRow from './GridRow';
import LegendBox from './LegendBox';

interface HeatmapProps {
  readonly data: HeatMapData[];
  readonly selectedRows: Data[];
  readonly dataSuffix: string;
}

export interface HeatmapMetrics {
  [id: string]: string;
}

export interface LegendData {
  readonly low: number;
  readonly high: number;
  readonly color: string;
}

const legendColours = ['#FFECDC', '#FED0AB', '#FFC568', '#F9A825', '#DC4545'];

const Heatmap: React.FC<HeatmapProps> = ({ data, selectedRows, dataSuffix }) => {
  const [tests, setTests] = useState<string[]>([]);
  const [devices, setDevices] = useState<string[]>([]);
  const [heatMapData, setHeatMapData] = useState<HeatmapMetrics>({});
  const [legendData, setLegendData] = useState<LegendData[]>([]);

  const classes = PerformanceDashboardStyles();

  useEffect(() => {
    const tests = data.map(test => test.testId);
    const devices: string[] = [];
    const heatMapData: HeatmapMetrics = {};
    const values: number[] = [];
    data.forEach(test =>
      test.metrics.forEach(device => {
        devices.push(device.deviceName);
        heatMapData[`${test.testId}_${device.deviceName}`] = device.value;
        values.push(Number(device.value));
      }),
    );
    devices.push('');
    const uniqueDevices: string[] = devices.filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    });
    setTests(tests);
    setDevices(uniqueDevices);
    setHeatMapData(heatMapData);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const increment = (maxValue - minValue) / 5;
    const legendDataPoints: number[] = [];
    for (let i = 0; i < 5; i++) i === 0 ? legendDataPoints.push(minValue) : legendDataPoints.push(legendDataPoints[i - 1] + increment);
    const legendData: LegendData[] = legendDataPoints.map((point, index) => {
      return { low: Number(point.toFixed(3)), high: Number((point + increment).toFixed(3)), color: legendColours[index] };
    });
    setLegendData(legendData);
  }, []);

  return (
    <div className={classes.startFlexContainer}>
      <div className={classes.legendContainer}>
        {legendData.map(item => (
          <div className={classes.legendGap} key={item.color}>
            <LegendBox color={item.color} />
            <span className={classes.legendText}>{`${item.low}${dataSuffix}-${item.high}${dataSuffix}`}</span>
          </div>
        ))}
      </div>
      <div className={classes.heatMapContainer}>
        <Grid container spacing={1}>
          {devices.map(device => (
            <Grid key={device} container item spacing={1}>
              <GridRow legendData={legendData} device={device} tests={tests} heatMapData={heatMapData} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
export default Heatmap;
