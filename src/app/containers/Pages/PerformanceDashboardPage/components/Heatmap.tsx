import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import { HeatMapData } from '../SharedTypes';
import { Data } from './Table';
import GridRow from './GridRow';

interface HeatmapProps {
  data: HeatMapData[];
  selectedRows: Data[];
  dataSuffix: string;
}

export interface HeatmapMetrics {
  [id: string]: number;
}

const Heatmap: React.FC<HeatmapProps> = ({ data, selectedRows, dataSuffix }) => {
  const [tests, setTests] = useState<string[]>([]);
  const [devices, setDevices] = useState<string[]>([]);
  const [heatMapData, setHeatMapData] = useState<HeatmapMetrics>({});

  const classes = PerformanceDashboardStyles();

  useEffect(() => {
    const tests = data.map(test => test.testId);
    const devices: string[] = [];
    const heatMapData: HeatmapMetrics = {};
    data.forEach(test =>
      test.metrics.forEach(device => {
        devices.push(device.deviceName);
        heatMapData[`${test.testId}_${device.deviceName}`] = device.value;
      }),
    );
    devices.push('');
    setTests(tests);
    setDevices(devices);
    setHeatMapData(heatMapData);
  }, []);

  return (
    <div className={classes.startFlexContainer}>
      <div>Legend</div>
      <div>
        <Grid container spacing={1}>
          {devices.map(device => (
            <Grid container item spacing={3}>
              <GridRow device={device} tests={tests} heatMapData={heatMapData} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
export default Heatmap;
