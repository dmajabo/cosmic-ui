import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import { HeatMapData } from '../SharedTypes';
import { Data } from './Table';
interface HeatmapProps {
  data: HeatMapData[];
  selectedRows: Data[];
  dataSuffix: string;
}

interface HeatmapMetrics {
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
    setTests(tests);
    setDevices(devices);
    setHeatMapData(heatMapData);
  }, []);

  return (
    <div className={classes.startFlexContainer}>
      <div>Legend</div>
      <div>Heatmap</div>
    </div>
  );
};
export default Heatmap;
