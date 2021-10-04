import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import { HeatMapData } from '../SharedTypes';
import { GridRow } from './GridRow';
import LegendBox from './LegendBox';
import { TestIdToName } from './PacketLoss';
import { uniq } from 'lodash';

interface HeatmapProps {
  readonly data: HeatMapData[];
  readonly selectedRows: TestIdToName;
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

const LATENCY_SUFFIX = 'ms';

const MAX_LEGEND_COUNT = 5;

const LEGEND_COLOURS = ['#FFECDC', '#FED0AB', '#FFC568', '#F9A825', '#DC4545'];

const Heatmap: React.FC<HeatmapProps> = ({ data, selectedRows, dataSuffix }) => {
  const [tests, setTests] = useState<string[]>([]);
  const [devices, setDevices] = useState<string[]>([]);
  const [heatMapData, setHeatMapData] = useState<HeatmapMetrics>({});
  const [legendData, setLegendData] = useState<LegendData[]>([]);

  const classes = PerformanceDashboardStyles();

  useEffect(() => {
    const testsId = data.map(test => test.testId);
    const devices: string[] = [];
    const heatMapData: HeatmapMetrics = {};
    const values: number[] = [];

    data.forEach(test => {
      test.metrics.forEach(device => {
        devices.push(device.resourceId);
        heatMapData[`${test.testId}_${device.resourceId}`] = dataSuffix === LATENCY_SUFFIX ? Number(device.keyedmap[0].ts[0].value).toFixed(2) : device.keyedmap[0].ts[0].value;
        values.push(Number(Number(device.keyedmap[0].ts[0].value).toFixed(2)));
      });
    });

    devices.push(''); // Adds an extra row to display Test Names.

    const uniqueDevices: string[] = uniq(devices);

    setTests(testsId);
    setDevices(uniqueDevices);
    setHeatMapData(heatMapData);

    const maxValue = Math.max(...values);
    const minValue = 0;
    const increment = (maxValue - minValue) / 5;
    const legendDataPoints: number[] = [];

    for (let i = 0; i < MAX_LEGEND_COUNT; i++) {
      i === 0 ? legendDataPoints.push(minValue) : legendDataPoints.push(legendDataPoints[i - 1] + increment);
    }
    const legendData: LegendData[] = legendDataPoints.map((point, index) => {
      return { low: Number(point.toFixed(3)), high: Number((point + increment).toFixed(3)), color: LEGEND_COLOURS[index] };
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
              <GridRow dataSuffix={dataSuffix} selectedRows={selectedRows} legendData={legendData} device={device} tests={tests} heatMapData={heatMapData} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
export default Heatmap;
