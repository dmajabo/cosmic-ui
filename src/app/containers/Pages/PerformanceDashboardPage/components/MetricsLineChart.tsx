import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DateTime } from 'luxon';
import { MetricKeyValue } from './PacketLoss';
import { Data } from './Table';

interface DataPoint {
  readonly name: string;
  readonly y: number;
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

const COLORS = [
  '#004D40',
  '#00BCD4',
  '#01579B',
  '#0277BD',
  '#0288D1',
  '#03A9F4',
  '#1A237E',
  '#26A69A',
  '#4527A0',
  '#4A148C',
  '#512DA8',
  '#558B2F',
  '#5C6BC0',
  '#673AB7',
  '#006064',
  '#00695C',
  '#00796B',
  '#00838F',
  '#009688',
  '#0097A7',
  '#26C6DA',
  '#283593',
  '#29B6F6',
  '#303F9F',
  '#311B92',
  '#33691E',
  '#3F51B5',
  '#689F38',
  '#6A1B9A',
  '#7B1FA2',
  '#7E57C2',
  '#80CBC4',
  '#80DEEA',
  '#81D4FA',
  '#880E4F',
  '#8BC34A',
  '#9C27B0',
  '#9CCC65',
  '#9FA8DA',
  '#AB47BC',
  '#AD1457',
  '#B39DDB',
  '#B71C1C',
  '#C2185B',
  '#C5E1A5',
  '#C62828',
  '#CE93D8',
  '#D32F2F',
  '#E91E63',
  '#EC407A',
  '#EF5350',
  '#EF9A9A',
  '#F44336',
  '#F48FB1',
];

export const MetricsLineChart: React.FC<LineChartProps> = ({ selectedRows, dataValueSuffix, inputData }) => {
  const [data, setData] = useState<ChartData[]>([]);
  const [tickInterval, setTickInterval] = useState<number>(0);

  useEffect(() => {
    const tempChartData: ChartData[] = selectedRows.map(row => {
      return {
        name: `${row.name} &#9654 ${row.sourceDevice}`,
        data: inputData[row.id].map(item => {
          const val = DateTime.fromFormat(item.time, OLD_TIME_FORMAT).toUTC().toFormat(REQUIRED_FORMAT);
          return {
            name: val,
            y: Number(Number.parseFloat(item.value).toFixed(2)),
            marker: {
              enabled: false,
            },
            states: {
              hover: {
                lineWidthPlus: 0,
              },
            },
          };
        }),
        turboThreshold: inputData[row.id].length,
      };
    });
    const anomalyData: ChartData[] = selectedRows.map(row => {
      return {
        name: `${row.name}_anomaly`,
        data: inputData[`${row.id}_anomaly`].map(item => {
          const val = DateTime.fromFormat(item.time, OLD_TIME_FORMAT).toUTC().toFormat(REQUIRED_FORMAT);
          return {
            name: val,
            y: Number(Number.parseFloat(item.value).toFixed(2)),
            marker: {
              enabled: true,
              radius: 3,
              color: 'red',
            },
            states: {
              hover: {
                lineWidthPlus: 0,
              },
            },
            lineWidth: 0,
          };
        }),
        turboThreshold: inputData[row.id].length,
        showInLegend: false,
      };
    });
    const finalChartData = tempChartData.concat(anomalyData);
    setData(finalChartData);

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
    plotOptions: {
      series: {
        marker: {
          symbol: 'square',
          radius: 10,
        },
      },
    },
    legend: {
      symbolHeight: 20,
      symbolPadding: 10,
    },
    colors: COLORS,
    credits: {
      enabled: false,
    },
    series: data,
  };

  return <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />;
};
