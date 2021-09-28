import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DateTime } from 'luxon';
import { MetricKeyValue } from './PacketLoss';
import { Data } from './Table';

interface DataPoint {
  name: string;
  y: number;
}

interface ChartData {
  readonly name: string;
  readonly data: DataPoint[];
}

interface LineChartProps {
  readonly dataValueSuffix?: string;
  readonly selectedRows: Data[];
  readonly inputData: MetricKeyValue;
  readonly timeFormat?: string;
}

const OLD_TIME_FORMAT: string = 'yyyy-MM-dd HH:mm:ss ZZZ z';
const REQUIRED_FORMAT: string = 'yy/MM/dd HH:mm';

export const MetricsLineChart: React.FC<LineChartProps> = ({ selectedRows, dataValueSuffix, inputData }) => {
  const [data, setData] = useState<ChartData[]>([]);
  const [tickInterval, setTickInterval] = useState<number>(0);

  useEffect(() => {
    const tempChartData: ChartData[] = selectedRows.map(row => {
      return {
        name: row.name,
        data: inputData[row.id].map(item => {
          const val = DateTime.fromFormat(item.time, OLD_TIME_FORMAT).toUTC().toFormat(REQUIRED_FORMAT);
          return {
            name: val,
            y: Number(Number.parseFloat(item.value).toFixed(2)),
            marker: {
              enabled: false,
            },
          };
        }),
        turboThreshold: inputData[row.id].length,
      };
    });
    setData(tempChartData);

    const dataLength: number[] = selectedRows.map(row => inputData[row.id].length);
    const maxDataLengthIndex = dataLength.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0);

    setTickInterval(Math.floor(inputData[selectedRows[maxDataLengthIndex].id].length / 10));
  }, [inputData]);

  const lineChartOptions = {
    time: {
      useUTC: false,
    },
    title: false,
    xAxis: {
      type: 'category',
      tickInterval: tickInterval,
    },
    tooltip: {
      valueSuffix: dataValueSuffix ? ` ${dataValueSuffix}` : '',
    },
    yAxis: {
      title: false,
      labels: {
        format: dataValueSuffix ? `{text} ${dataValueSuffix}` : `{text}`,
      },
    },
    legend: {
      symbolPadding: 10,
    },
    credits: {
      enabled: false,
    },
    series: data,
  };

  return <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />;
};
